using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Contracts.Response;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.API.Services.Interfaces;

public interface IAdminService
{
    Task<PageResponse<GeneratedResume>> GetGeneratedResumes(PageRequest pageRequest,string? loggedInUserId);
    Task<PageResponse<BasicDetails>> GetBasicDetailsOfAllResumes(PageRequest pageRequest,string? loggedInUserId);
    Task<PageResponse<User>> GetApprovedUsers(PageRequest pageRequest,string? loggedInUserId);
    Task<PageResponse<User>> GetUnApprovedUsers(PageRequest pageRequest,string? loggedInUserId);
    Task<Boolean> ApproveUser(string? userId,string? loggedInUserId);
    Task<GeneratedResume> GetGeneratedResumeById(string? loggedInUserId, string resumeId);
    Task<BasicDetails> GetBasicDetailsById(string? loggedInUserId, string basicDetailsId);
}