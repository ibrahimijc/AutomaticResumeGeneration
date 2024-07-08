
using System.Net;
using Microsoft.AspNetCore.Mvc;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Services.Interfaces;

namespace ResumeBuilderService.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UserController : BaseController
{
    private readonly IUserService _userService;
    
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginRequest loginRequest)
    {
        return await HandleRequest(() => _userService.Login(loginRequest), (int) HttpStatusCode.OK);
    }
    
    [HttpPost("Signup")]
    public async Task<IActionResult> Signup(RegisterRequest createUserRequest)
    {
        return await HandleRequest(() => _userService.SignUp(createUserRequest), (int) HttpStatusCode.Created);
    }
    
    // [HttpPost("role")]
    // public async Task<IActionResult> CreateRole(CreateRoleRequest createRoleRequest)
    // {
    //     return await HandleRequest(() => _userService.CreateRole(createRoleRequest), (int) HttpStatusCode.Created);
    // }
}