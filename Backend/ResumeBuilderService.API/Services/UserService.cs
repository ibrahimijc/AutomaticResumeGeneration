using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Contracts.Response;
using ResumeBuilderService.API.Services.Interfaces;
using ResumeBuilderService.Domain.Constants;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.API.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<UserRole> _roleManager;

    public UserService(UserManager<User> userManager, RoleManager<UserRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IdentityResult> CreateRole(CreateRoleRequest request)
    {
        var appRole = new UserRole { Name = request.Role };
        var createRole = await _roleManager.CreateAsync(appRole);
        return createRole;
    }

    public async Task<RegisterResponse>  SignUp(RegisterRequest request)
    {
        var result = await RegisterAsync(request);
        if (!result.Success)
            throw new BadHttpRequestException(result.Message);
        
        return result;
    }

    public async Task<LoginResponse> Login(LoginRequest loginRequest)
    {
        var response = await LoginAsync(loginRequest);
        return response.Success ? response : throw new BadHttpRequestException("Invalid Credentials Provided");
    }

    private async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
    {
        try
        {
            var userExists = await _userManager.FindByEmailAsync(request.Email);
            if (userExists != null) return new RegisterResponse { Message = "User already exists", Success = false };

            //if we get here, no user with this email..

            userExists = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                UserName = request.Email,
                UserType = (int) UserTypeEnum.User,
                IsApproved = false
            };
            
            var createUserResult = await _userManager.CreateAsync(userExists, request.Password);
            if (!createUserResult.Succeeded)
                return new RegisterResponse
                {
                    Message = $"Create user failed {createUserResult?.Errors?.First()?.Description}", Success = false
                };
            
            // //then add user to a role...
            // var addUserToRoleResult = await _userManager.AddToRoleAsync(userExists, "USER");
            // if (!addUserToRoleResult.Succeeded)
            //     return new RegisterResponse
            //     {
            //         Message =
            //             $"Create user succeeded but could not add user to role {addUserToRoleResult?.Errors?.First()?.Description}",
            //         Success = false
            //     };

            //all is still well..
            return new RegisterResponse
            {
                Success = true,
                Message = "User registered successfully"
            };
        }
        catch (Exception ex)
        {
            return new RegisterResponse { Message = ex.Message, Success = false };
        }
    }
    
    private async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user is null) return new LoginResponse { Message = "Invalid email/password", Success = false };
            if (!await _userManager.CheckPasswordAsync(user, request.Password))
                return new LoginResponse { Message = "Invalid email/password", Success = false };
            
            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.UserName),
                new(ClaimTypes.Email, user.Email),
                new Claim("UserId", user.Id.ToString())
            };
            
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x));
            claims.AddRange(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1swek3u4uo2u4a6e"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddYears(4);

            var token = new JwtSecurityToken(
                issuer: "ResumeServiceIssuer",
                audience: "ResumeAIServiceUsers",
                claims: claims,
                // expires: expires,
                signingCredentials: creds
            );

            return new LoginResponse
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                Message = "Login Successful",
                Email = user?.Email,
                Success = true,
                UserId = user?.Id.ToString(),
                IsAdmin = user?.IsAdmin ?? false,
                IsApproved = user?.IsApproved ?? false
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new LoginResponse { Success = false, Message = ex.Message };
        }
    }
}