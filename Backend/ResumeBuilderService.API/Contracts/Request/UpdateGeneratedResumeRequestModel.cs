namespace ResumeBuilderService.API.Contracts.Request;

public class UpdateGeneratedResumeRequestModel : CreateBasicDetailsRequestModel
{
    public string ResumeId { get; set; }
}