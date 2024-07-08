using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Services.Interfaces;


namespace ResumeBuilderService.API.Controllers;


[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class AdminController : BaseController
{
    private readonly IAdminService _adminService;
    
    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("ListApprovedUsers")]
    public async Task<IActionResult> GetApprovedUsers(PageRequest pageRequest)
    {
        var loggedInUserId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _adminService.GetApprovedUsers(pageRequest,loggedInUserId), (int) HttpStatusCode.Created);
    }
    
    [HttpPost("ListUnapprovedUsers")]
    public async Task<IActionResult> GetUnapprovedUsers(PageRequest pageRequest)
    {
        var loggedInUserId = User.FindFirst("loggedInUserId")?.Value;
        return await HandleRequest(() => _adminService.GetUnApprovedUsers(pageRequest,loggedInUserId), (int) HttpStatusCode.Created);
    }
    
    [HttpPost("GeneratedResumes")]
    public async Task<IActionResult> GetGeneratedResumes(PageRequest pageRequest)
    {
        var loggedInUserId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _adminService.GetGeneratedResumes(pageRequest,loggedInUserId), (int) HttpStatusCode.Created);
    }
    
    [ HttpPost("BasicDetailsResumes")]
    public async Task<IActionResult> GetBasicDetails(PageRequest pageRequest)
    {
        var loggedInUserId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _adminService.GetBasicDetailsOfAllResumes(pageRequest, loggedInUserId), (int) HttpStatusCode.Created);
    }
    
    [HttpPost("ApproveUser")]
    public async Task<IActionResult> ApproveUser(String userId)
    {
        var loggedInUserId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _adminService.ApproveUser(loggedInUserId,userId), (int) HttpStatusCode.Created);
    }
    
    [HttpGet("GetGeneratedResumeById")]
    public async Task<IActionResult> GetGenerateResumeById(String resumeId)
    {
        var loggedInUserId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _adminService.GetGeneratedResumeById(loggedInUserId,resumeId), (int) HttpStatusCode.Created);
    }
    
    [HttpGet("GetBasicDetailById")]
    public async Task<IActionResult> GetBasicDetailsById(String basicDetailsId)
    {
        var loggedInUserId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _adminService.GetBasicDetailsById(loggedInUserId,basicDetailsId), (int) HttpStatusCode.Created);
    }
}