namespace ResumeBuilderService.Domain.ValueObjects;

public class Work
{
    public string Name { get; set; }
    public string Position { get; set; }
    public string Url { get; set; }
    public string StartDate { get; set; }
    public bool IsWorkingHere { get; set; }
    public string? EndDate { get; set; }
    public List<string> Highlights { get; set; }
    public string Summary { get; set; }
    public string Years { get; set; }
}