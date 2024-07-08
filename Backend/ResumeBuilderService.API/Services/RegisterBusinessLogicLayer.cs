using ResumeBuilderService.API.Services.Interfaces;

namespace ResumeBuilderService.API.Services;

public static class RegisterBusinessLogicLayer
{
    public static void AddBusinessLogicLayer(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IBasicDetailsService, BasicDetailsService>();
        services.AddScoped<IGenereatedResumeService, GeneratedResumeService>();
        services.AddScoped<IAnalyticService, AnalyticsService>();
        services.AddScoped<IAdminService, AdminService>();
    }
}