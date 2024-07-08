using Microsoft.AspNetCore.Identity;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Contracts.Response;
using Serilog;

namespace ResumeBuilderService.API.Services.Interfaces;

public interface IUserService
{
    public Task<RegisterResponse> SignUp(RegisterRequest request);
    public Task<LoginResponse> Login(LoginRequest request);
    public Task<IdentityResult> CreateRole(CreateRoleRequest request);
}