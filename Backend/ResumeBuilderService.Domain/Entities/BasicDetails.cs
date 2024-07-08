using ResumeBuilderService.Domain.ValueObjects;

namespace ResumeBuilderService.Domain.Models;

public class BasicDetails: BaseEntity
{
    public BasicDetails()
    {
        Work = new List<Work>();
        Education = new List<Education>();
        Volunteer = new List<Volunteer>();
        Awards = new List<Award>();
        Skills = new List<Skills>();
    }
    
    public string UserId { get; set; }
    public Basics Basics { get; set; }
    public List<Skills> Skills { get; set; }
    public List<Work> Work { get; set; }
    public List<Education> Education { get; set; }
    public Activities Activities { get; set; }
    public List<Volunteer> Volunteer { get; set; }
    public List<Award> Awards { get; set; }
}
