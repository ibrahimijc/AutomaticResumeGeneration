using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Services.Interfaces;

namespace ResumeBuilderService.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class BasicDetailsController : BaseController
{
    private readonly IBasicDetailsService _basicDetailsService;

    public BasicDetailsController(IBasicDetailsService basicDetailsService)
    {
        _basicDetailsService = basicDetailsService;
    }

    [HttpPut("")]
    public async Task<IActionResult> CreateOrUpdateUserDetails(CreateBasicDetailsRequestModel createBasicDetailsRequest)
    {
        var userId = User.FindFirst("UserId")?.Value;
        if (string.IsNullOrEmpty(userId)) throw new InvalidOperationException("User Id not found.");
        createBasicDetailsRequest.UserId = userId;
        return await HandleRequest(() => _basicDetailsService.CreateOrUpdateBasicDetails(createBasicDetailsRequest), (int) HttpStatusCode.Created);
    }
    
    [HttpGet("")]
    public async Task<IActionResult> GetUserDetails()
    {
        var userId = User.FindFirst("UserId")?.Value;
        if (string.IsNullOrEmpty(userId)) throw new InvalidOperationException("User Id not found.");
        return await HandleRequest(() => _basicDetailsService.GetUserDetails(userId), (int) HttpStatusCode.OK);
    }
}