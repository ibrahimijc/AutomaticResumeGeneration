using ResumeBuilderService.Domain.ValueObjects;

namespace ResumeBuilderService.API.Contracts.Request;

public class GenerateResumeRequest
{
    public string CompanyTitle { get; set; }
    public string JobTitle { get; set; }
    public string JobDescription { get; set; }
    public string? JobDescriptionWithoutStopWords { get; set; }
}