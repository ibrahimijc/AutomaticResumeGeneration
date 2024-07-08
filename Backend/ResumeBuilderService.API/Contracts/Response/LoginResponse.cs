namespace ResumeBuilderService.API.Contracts.Response;

public class LoginResponse
{
    public bool Success { get; set; }
    public string AccessToken { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public bool IsAdmin { get; set; }
    public bool IsApproved { get; set; }
}