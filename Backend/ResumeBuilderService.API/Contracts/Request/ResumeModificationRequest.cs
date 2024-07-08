using ResumeBuilderService.Domain.ValueObjects;

namespace ResumeBuilderService.API.Contracts.Request;

public class ResumeModificationRequest
{
    public string ProfessionTitle { get; set; }
    public string CareerObjective { get; set; }
    public string CareerSummary { get; set; }
    public List<Skills> Skills { get; set; }
    public List<Experience> Work { get; set; }
}

public class Experience
{
    public string CompanyName { get; set; }
    public string Position { get; set; }
    public List<string> Highlights { get; set; }
    public string Summary { get; set; }
}