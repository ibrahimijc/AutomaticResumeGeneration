using AutoMapper;
using ResumeBuilderService.API.Constants;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Services.Interfaces;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.API.Services;

public class BasicDetailsService : IBasicDetailsService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public BasicDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<BasicDetails> CreateOrUpdateBasicDetails(CreateBasicDetailsRequestModel requestModel)
    {
        var queryable = _unitOfWork.BasicDetailsRepository.Table;
        var result = queryable.FirstOrDefault(x => x.UserId == requestModel.UserId);
        if (result == null) return await CreateBasicDetails(requestModel);

        return await UpdateBasicDetails(result, requestModel);
    }

    public async Task<BasicDetails> GetUserDetails(string userId)
    {
        var queryable = _unitOfWork.BasicDetailsRepository.Table;
        var result = queryable.FirstOrDefault(x => x.UserId == userId);
        if (result == null)
            return BasicDefaultResume.GetDefaultResume();
        
        if (result == null) throw new InvalidOperationException("User details not found.");
        return result;
    }
    
    private async Task<BasicDetails> UpdateBasicDetails(BasicDetails basicDetails, CreateBasicDetailsRequestModel requestModel)
    {
        var mappedResume = _mapper.Map<BasicDetails>(requestModel);
        mappedResume.Id = basicDetails.Id;
        return await _unitOfWork.BasicDetailsRepository.UpdateAsync(mappedResume);
    }
    
    private async Task<BasicDetails> CreateBasicDetails(CreateBasicDetailsRequestModel requestModel)
    {
        var mappedResume = _mapper.Map<BasicDetails>(requestModel);
        return await _unitOfWork.BasicDetailsRepository.InsertAsync(mappedResume);
    }
}