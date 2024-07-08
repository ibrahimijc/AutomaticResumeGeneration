using System.Linq.Expressions;
using AutoMapper;
using MongoDB.Driver.Linq;
using Newtonsoft.Json;
using ResumeBuilderService.API.Constants;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Services.Interfaces;
using ResumeBuilderService.API.Utility;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;
using ResumeBuilderService.Domain.ValueObjects;
using Serilog;
using Standard.AI.OpenAI.Clients.OpenAIs;
using Standard.AI.OpenAI.Models.Configurations;
using Standard.AI.OpenAI.Models.Services.Foundations.ChatCompletions;
using Standard.AI.OpenAI.Models.Services.Foundations.Completions;

namespace ResumeBuilderService.API.Services;

public class GeneratedResumeService : IGenereatedResumeService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GeneratedResumeService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    
    public async Task GenerateResume(string userId, GenerateResumeRequest generateResumeRequest)
    {
        var baseResume = await _unitOfWork.BasicDetailsRepository.GetByUserId(userId);
        var generatedResume = await GetGeneratedResume(userId, generateResumeRequest, baseResume);
        await _unitOfWork.GeneratedResumeRepository.InsertAsync(generatedResume);
    }

    public async Task<List<GeneratedResume>> ListGeneratedResume(string userId)
    {
        return await _unitOfWork.GeneratedResumeRepository.GetAll(x => x.UserId == userId);
    }

    private async Task<GeneratedResume> GetGeneratedResume(string userId, GenerateResumeRequest generateResumeRequest, BasicDetails baseResume)
    {
        var stopWordsRemover = new StopWordsRemover();
        var jobDescriptionWithoutStopWords =
            stopWordsRemover.RemoveStopWords(generateResumeRequest.JobDescription);
        generateResumeRequest.JobDescriptionWithoutStopWords = jobDescriptionWithoutStopWords;
        var chatCompletionResult = await GetChatCompletionResponseFromAi(baseResume,generateResumeRequest);
        var modifiedResume = ExtractModifiedResumeFromAiResponse(chatCompletionResult);
        if (modifiedResume != null)
            ModifyAiResponseToBaseResume(baseResume,modifiedResume);
        return new GeneratedResume(userId, generateResumeRequest.CompanyTitle, generateResumeRequest.JobTitle, generateResumeRequest.JobDescription, jobDescriptionWithoutStopWords, baseResume);
    }

    private void ModifyAiResponseToBaseResume(BasicDetails baseResume, ResumeModificationRequest modificationRequest)
    {
        if (modificationRequest?.Skills != null && modificationRequest.Skills.Count > 0)
            baseResume.Skills = modificationRequest.Skills;
        
        if (modificationRequest?.Work != null && modificationRequest.Work.Count > 0)
            baseResume.Work = _mapper.Map<List<Work>>(modificationRequest.Work);
        
        if (!string.IsNullOrEmpty(modificationRequest?.ProfessionTitle))
            baseResume.Basics.Label = modificationRequest.ProfessionTitle;  
        
        if (!string.IsNullOrEmpty(modificationRequest?.CareerObjective))
            baseResume.Basics.Objective = modificationRequest.CareerObjective; 
        
        if (!string.IsNullOrEmpty(modificationRequest?.CareerSummary))
            baseResume.Basics.Summary = modificationRequest.CareerSummary;
    }
    
    private async Task GetResponseFromAi(BasicDetails baseResume, GenerateResumeRequest generateResumeRequest)
    {
        var openAIConfigurations = new OpenAIConfigurations
        {
            ApiKey = "sk-proj-wRsAIeHWPN8xy6FW9E1vT3BlbkFJRkp8QBm1igohY038z03N",
            // OrganizationId = "YOUR_OPTIONAL_ORG_ID_HERE"
        };

        var openAiClient = new OpenAIClient(openAIConfigurations);

        var inputCompletion = new Completion
        {
            Request = new CompletionRequest
            {
                Prompts = new string[]
                {
                    $"Here's the json resume : {JsonConvert.SerializeObject(baseResume)}",
                    $"Here's the job description: {generateResumeRequest.JobDescription}",
                    $"Based on job description modify contents of Basic.Summary and Skills and return json strictly. Keep the json structure same, just change content."
                }
                ,
                Model = OpenAIModels.GPT35TurboInstruct
            }
        };
        
        Completion resultCompletion =
            await openAiClient.Completions.PromptCompletionAsync(
                inputCompletion);

        foreach (var generatedResume in resultCompletion.Response.Choices)
        {
            try
            {
                JsonConvert.DeserializeObject<BasicDetails>(generatedResume.Text);
            }
            catch (Exception e)
            {
                Log.Error($"Unable to deserialize json. Error: {e.Message} Stacktrace:{e.StackTrace}");
            }
        }
        
        Array.ForEach(
            resultCompletion.Response.Choices, 
            choice => Console.WriteLine(choice.Text));
    }
    
    private async Task<ChatCompletion?> GetChatCompletionResponseFromAi(BasicDetails baseResume, GenerateResumeRequest generateResumeRequest)
    {
        var openAiConfigurations = new OpenAIConfigurations
        {
            ApiKey = "YOUR API KEY HERE",
        };

        var openAiClient = new OpenAIClient(openAiConfigurations);
        var modifyResumeRequest = _mapper.Map<ResumeModificationRequest>(baseResume);
        var chatCompletionRequest = new ChatCompletion
        {
            Request = new ChatCompletionRequest
            {
                MaxTokens = 4000,
                Model = "gpt-4",
                Messages = new ChatCompletionMessage[]
                {
                    new ChatCompletionMessage
                    {
                        Content = "You're a helpful assistant, who will help in modifying json resume based on job description and will return response strictly in json with the same key value structure. You'll only return json response.",
                        Role = "system",
                    },
                    new ChatCompletionMessage
                    {
                        Content = $"Here's my base resume in json format : {JsonConvert.SerializeObject(modifyResumeRequest)}",
                        Role = "user",
                    }
                    ,new ChatCompletionMessage
                    {
                        Content = $"Applying to company named {generateResumeRequest.CompanyTitle}, for the position {generateResumeRequest.JobTitle} which has the following job description: {generateResumeRequest.JobDescriptionWithoutStopWords}",
                        Role = "user",
                    },
                    // ,new ChatCompletionMessage
                    // {
                    //     Content = $"Based on above information, modify information in json resume and return json strictly in the same format but updated information related to the applying position.",
                    //     Role = "user",
                    // },
                    new ChatCompletionMessage
                    {
                        Content = "Based on job description, company Name and job title, modify contents of json resume and return json strictly in the same format but updated contents. Don't change total experiences. Make sure to modify all the key value pair of json. Don't change company names in Experience section. Don't change Position in Experience Section.",
                        Role = "user",
                    }
                },
            }
        };
        Log.Information($"Chat completion request {JsonConvert.SerializeObject(chatCompletionRequest)}");

        var resultChatCompletion =
            await openAiClient.ChatCompletions.SendChatCompletionAsync(
                chatCompletionRequest);

        return resultChatCompletion;
    }

    private static ResumeModificationRequest? ExtractModifiedResumeFromAiResponse(ChatCompletion? chatCompletionResponse)
    {
        if (chatCompletionResponse == null) return null;
        if (chatCompletionResponse.Response.Choices.Length == 0) return null;
        ResumeModificationRequest? result = null;
        try
        {
            Log.Information($"Message content {chatCompletionResponse.Response.Choices[0].Message.Content}");
            Log.Information($"Finish Reason {chatCompletionResponse.Response.Choices[0].FinishReason}");
            result = JsonConvert.DeserializeObject<ResumeModificationRequest?>(chatCompletionResponse.Response
                .Choices[0].Message.Content);
            return result;
        }
        catch (Exception ex)
        {
            Log.Information($"Unable to generate resume {ex}");
            
        }

        return result;
    }

    public async Task<BasicDetails> GetGeneratedResumeById(string? loggedInUserId, string resumeId)
    {
        if (string.IsNullOrEmpty(resumeId))
        {
            throw new ArgumentNullException(nameof(resumeId), "Resume ID cannot be null or empty.");
        }
        
        if (string.IsNullOrEmpty(loggedInUserId)) 
            throw new InvalidOperationException("User Id not found.");
        
        var generatedResumeQueryable = (IMongoQueryable<GeneratedResume>)_unitOfWork.GeneratedResumeRepository.Table;
        
        Expression<Func<GeneratedResume, bool>> filterExpression = r => r.Id == resumeId;
        var generatedResume = await generatedResumeQueryable.FirstOrDefaultAsync(filterExpression);
        return generatedResume.Resume;
    }

    public async Task UpdateGeneratedResumeDetails(UpdateGeneratedResumeRequestModel requestModel)
    {
        var queryable = _unitOfWork.GeneratedResumeRepository.Table;
        var result = queryable.FirstOrDefault(x => x.Id == requestModel.ResumeId);
        if (result == null) throw new InvalidOperationException("Resume Not found!");

        await UpdateGeneratedResume(result, requestModel);
    }
    
    private async Task UpdateGeneratedResume(GeneratedResume generatedResume, CreateBasicDetailsRequestModel requestModel)
    {
        var mappedResume = _mapper.Map<BasicDetails>(requestModel);
        generatedResume.Resume = mappedResume;
        await  _unitOfWork.GeneratedResumeRepository.UpdateAsync(generatedResume);
    }
    
    private static void GetPayloadForGeneratingResume(GenerateResumeRequest generateResumeRequest, BasicDetails baseResume)
    {
        
    }
}