namespace ResumeBuilderService.API.Contracts.Request;

public class PageRequest
{
    public int PageNo { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}