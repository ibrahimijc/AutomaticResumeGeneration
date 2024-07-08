using Microsoft.AspNetCore.Mvc;

namespace ResumeBuilderService.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class HealthCheckController : BaseController
{
    [HttpGet]
    public IActionResult HealthCheck() => Ok("Successful!");
}