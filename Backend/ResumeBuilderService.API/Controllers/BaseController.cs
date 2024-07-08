using Microsoft.AspNetCore.Mvc;
using ResumeBuilderService.API.ApiResponse;
using Serilog;

namespace ResumeBuilderService.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class BaseController : ControllerBase
{
    protected async Task<IActionResult> HandleRequest<T>(Func<Task<T>> func, int successStatusCode) where T: class
    {
        if (func is null) throw new ArgumentNullException(nameof(func));

        try
        {
            var result = await func();
            dynamic? response = CreateResponse<T>.CreateSuccessResponse(result);
            return StatusCode(successStatusCode, response);
        }
        catch (KeyNotFoundException ex)
        {
            return HandleException(ex, StatusCodes.Status400BadRequest);
        }
        catch (Exception ex)
        {
            return HandleException(ex, StatusCodes.Status500InternalServerError);
        }
    }
    
    protected async Task<IActionResult> HandleRequest(Func<Task> func, int successStatusCode)
    {
        if (func is null) throw new ArgumentNullException(nameof(func));

        try
        {
            await func();
            var response = CreateResponse<object>.CreateSuccessResponse(new { });
            return StatusCode(successStatusCode, response);
        }
        catch (Exception ex)
        {
            return HandleException(ex, StatusCodes.Status500InternalServerError);
        }
    }

    private ObjectResult HandleException(Exception ex, int errorStatusCode)
    {
        LogException(ex);
        return StatusCode(errorStatusCode, CreateResponse<string>.CreateErrorResponse(errorStatusCode.ToString(), ex.Message));
    }

    private static void LogException(Exception ex)
    {
        Log.Error(ex.Message);
        if (!string.IsNullOrEmpty(ex.StackTrace))
        {
            Log.Error(ex.StackTrace);
        }
    }
}