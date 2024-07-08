using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Services.Interfaces;

namespace ResumeBuilderService.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class GenerateResumeController : BaseController
{
    private readonly IBasicDetailsService _basicDetailsService;
    private readonly IGenereatedResumeService _generatedResumeService;

    public GenerateResumeController(IBasicDetailsService basicDetailsService, IGenereatedResumeService genereatedResumeService)
    {
        _basicDetailsService = basicDetailsService;
        _generatedResumeService = genereatedResumeService;
    }

    [HttpPost("")]
    public async Task<IActionResult> GenerateResume(GenerateResumeRequest generateResumeRequest)
    {
        var userId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _generatedResumeService.GenerateResume(userId, generateResumeRequest), (int) HttpStatusCode.OK);
    }
    
    [HttpPut("UpdateResume")]
    public async Task<IActionResult> UpdateGeneratedResumeModel(UpdateGeneratedResumeRequestModel generateResumeRequestModel)
    {
        var userId = User.FindFirst("UserId")?.Value;
        if (string.IsNullOrEmpty(userId)) throw new InvalidOperationException("User Id not found.");
        generateResumeRequestModel.UserId = userId;
        return await HandleRequest(() => _generatedResumeService.UpdateGeneratedResumeDetails(generateResumeRequestModel), (int) HttpStatusCode.Created);
    }
    
    [HttpPost("List")]
    public async Task<IActionResult> ListResume()
    {
        var userId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _generatedResumeService.ListGeneratedResume(userId), (int) HttpStatusCode.OK);
    }
    
    [HttpGet("Generated-Resume-By-Id")]
    public async Task<IActionResult> GetGenerateResumeById(String resumeId)
    {
        var loggedInUserId = User.FindFirst("UserId")?.Value;
        return await HandleRequest(() => _generatedResumeService.GetGeneratedResumeById(loggedInUserId,resumeId), (int) HttpStatusCode.Created);
    }
}