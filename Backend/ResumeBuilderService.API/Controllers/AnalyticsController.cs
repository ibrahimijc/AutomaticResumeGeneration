using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeBuilderService.API.Services.Interfaces;

namespace ResumeBuilderService.API.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/[controller]")]
public class AnalyticsController : BaseController
{
    private readonly IAnalyticService _analyticService;

    public AnalyticsController(IAnalyticService analyticService)
    {
        _analyticService = analyticService;
    }

    [HttpGet("")]
    public async Task<IActionResult> Analytics()
    {
        var userId = User.FindFirst("UserId")?.Value;
        if (string.IsNullOrEmpty(userId)) throw new InvalidOperationException("User Id not found.");
        return await HandleRequest(() => _analyticService.GetAnalytics(userId), (int) HttpStatusCode.Created);
    }
}