using ResumeBuilderService.API.Contracts.Response;

namespace ResumeBuilderService.API.Services.Interfaces;

public interface IAnalyticService
{
    public Task<AnalyticsResponse> GetAnalytics(string userId);
}