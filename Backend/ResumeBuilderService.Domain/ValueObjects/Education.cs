namespace ResumeBuilderService.Domain.ValueObjects;

public class Education
{
    public Education()
    {
        Courses = new List<string>();
    }
    
    public string Institution { get; set; }
    public string Url { get; set; }
    public string StudyType { get; set; }
    public string Area { get; set; }
    public string StartDate { get; set; }
    public bool IsStudyingHere { get; set; }
    public string EndDate { get; set; }
    public string Score { get; set; }
    public List<string> Courses { get; set; }
}