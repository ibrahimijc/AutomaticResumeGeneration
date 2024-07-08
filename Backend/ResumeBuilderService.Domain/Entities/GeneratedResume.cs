using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.ValueObjects;

namespace ResumeBuilderService.Domain.Entities;

public class GeneratedResume : BaseEntity
{
    public string UserId { get; set; }
    public string CompanyTitle { get; set; }
    public string JobTitle { get; set; }
    public string JobDescription { get; set; }
    public Feedback? Feedback { get; set; }
    public string JobDescriptionWithoutStopWords { get; set; }
    public BasicDetails Resume { get; set; }
    
    public GeneratedResume(string userId, string companyTitle, string jobTitle, string jobDescription, string jobDescriptionWithoutStopWords, BasicDetails resume)
    {
        UserId = userId;
        CompanyTitle = companyTitle;
        JobTitle = jobTitle;
        JobDescription = jobDescription;
        JobDescriptionWithoutStopWords = jobDescriptionWithoutStopWords;
        Resume = resume;
    }
}