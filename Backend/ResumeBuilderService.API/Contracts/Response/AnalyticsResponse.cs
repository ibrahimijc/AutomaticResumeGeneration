namespace ResumeBuilderService.API.Contracts.Response;

public class AnalyticsResponse
{
    public int TotalResumeCount { get; set; }
    public double AverageRating { get; set; }
    public List<string> MostFrequentlyUsedSkills { get; set; }
    public List<string> TopRatedComments { get; set; }
    public List<string> LeastRatedComments { get; set; }
    public long TotalRegisteredUsers { get; set; }
    public int TotalResumesGeneratedToday { get; set; }
    public int TotalResumesGeneratedLast30Days { get; set; }
    
    public int TotalSignedUpUsersInLast30Days { get; set; }
    public int TotalSignedUpUsersToday { get; set; }
    public Dictionary<int, int> RatingCountMap { get; set; }
    
    public int TotalResumesWithNoFeedbacks { get; set; }
    public int TotalResumesWithFeedbacks { get; set; }
}