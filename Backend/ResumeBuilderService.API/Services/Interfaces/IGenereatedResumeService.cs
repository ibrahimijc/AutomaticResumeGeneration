using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.API.Services.Interfaces;

public interface IGenereatedResumeService
{
    Task GenerateResume(string userId, GenerateResumeRequest generateResumeRequest);
    Task<List<GeneratedResume>> ListGeneratedResume(string userId);
    Task<BasicDetails> GetGeneratedResumeById(string? loggedInUserId, string resumeId);
    Task UpdateGeneratedResumeDetails(UpdateGeneratedResumeRequestModel requestModel);

}