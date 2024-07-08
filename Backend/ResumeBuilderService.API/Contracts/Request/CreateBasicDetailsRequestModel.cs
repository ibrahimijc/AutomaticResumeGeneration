using System.ComponentModel.DataAnnotations;
using ResumeBuilderService.Domain.ValueObjects;

namespace ResumeBuilderService.API.Contracts.Request;

public class CreateBasicDetailsRequestModel
{
    public string? UserId { get; set; }
    [Required]
    public BasicsRequestModel Basics { get; set; }
    [Required]
    public List<Skills> Skills { get; set; }
    [Required]
    public List<Work> Work { get; set; }
    [Required]
    public List<Education> Education { get; set; }
    [Required]
    public Activities Activities { get; set; }
    [Required]
    public List<Volunteer> Volunteer { get; set; }
    [Required]
    public List<Award> Awards { get; set; }
}

public class BasicsRequestModel
{
    public BasicsRequestModel()
    {
        Profiles = new List<Profile>();
    }
    
    [Required]
    public string Name { get; set; }
    [Required]
    public string Label { get; set; }
    [Required]
    public string Image { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Phone { get; set; }
    [Required]
    public string Url { get; set; }
    [Required]
    public string Summary { get; set; }
    [Required]
    public Location Location { get; set; }
    [Required]
    public string RelExp { get; set; }
    [Required]
    public string TotalExp { get; set; }
    [Required]
    public string Objective { get; set; }
    [Required]
    public List<Profile> Profiles { get; set; }
}