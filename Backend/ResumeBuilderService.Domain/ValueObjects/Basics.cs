namespace ResumeBuilderService.Domain.ValueObjects;

public class Basics
{
    public Basics()
    {
        Profiles = new List<Profile>();
    }
    
    public string Name { get; set; }
    public string Label { get; set; }
    public string Image { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Url { get; set; }
    public string Summary { get; set; }
    public Location Location { get; set; }
    public string RelExp { get; set; }
    public string TotalExp { get; set; }
    public string Objective { get; set; }
    public List<Profile> Profiles { get; set; }
}