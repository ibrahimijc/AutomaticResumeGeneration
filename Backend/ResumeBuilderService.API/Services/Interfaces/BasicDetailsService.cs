using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.API.Services.Interfaces;

public interface IBasicDetailsService
{
    Task<BasicDetails> CreateOrUpdateBasicDetails(CreateBasicDetailsRequestModel requestModel);
    public Task<BasicDetails> GetUserDetails(string userId);
}