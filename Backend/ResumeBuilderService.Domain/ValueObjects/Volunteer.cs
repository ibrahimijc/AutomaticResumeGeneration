namespace ResumeBuilderService.Domain.ValueObjects;

public class Volunteer
{
    public Volunteer()
    {
        Highlights = new List<string>();
    }
    
    public string Organization { get; set; }
    public string Position { get; set; }
    public string Url { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public string Summary { get; set; }
    public List<string> Highlights { get; set; }
    public bool IsVolunteeringNow { get; set; }
}   