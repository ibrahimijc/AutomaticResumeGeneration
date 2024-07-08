using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ResumeBuilderService.API.Contracts.Response;
using ResumeBuilderService.API.Services.Interfaces;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;
using ResumeBuilderService.Domain.ValueObjects;

namespace ResumeBuilderService.API.Services;

public class AnalyticsService : IAnalyticService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMongoCollection<User> _userCollection;

    public AnalyticsService(IUnitOfWork unitOfWork,IMongoDatabase mongoDatabase)
    {
        _unitOfWork = unitOfWork;
        _userCollection = mongoDatabase.GetCollection<User>("users");
    }

    public async Task<AnalyticsResponse> GetAnalytics(string userId)
    {
        var user = await _userCollection.Aggregate().Match(x => x.Id == ObjectId.Parse(userId)).FirstOrDefaultAsync();
        if (!user.IsAdmin)
            throw new InvalidOperationException("Unauthorized access.");
        
        double averageRating = 0;
        var generatedResumeQueryable = (IMongoQueryable<GeneratedResume>)_unitOfWork.GeneratedResumeRepository.Table;
        
        var totalUserCountTask = _userCollection.CountDocumentsAsync(FilterDefinition<User>.Empty);
        var totalUserCount = await totalUserCountTask;

        var totalResumeCount = await generatedResumeQueryable.CountAsync();
        if (generatedResumeQueryable.Any(x => x.Feedback != null))
        {
            averageRating = await generatedResumeQueryable.Where(x => x.Feedback != null)
                    .AverageAsync(x => x.Feedback!.Rating);
        }  
        
        //FEEDBACKS
        
        // Get all feedback with ratings
        var allFeedback = await generatedResumeQueryable
            .SelectMany(resume => resume.Feedback == null ? Enumerable.Empty<Feedback>() : new[] { resume.Feedback })
            .Where(feedback => feedback != null)
            .ToListAsync();

        // Separate functions for clarity (optional)
        var topRatedComments = GetTopRatedComments(allFeedback);
        var leastRatedComments = GetLeastRatedComments(allFeedback);

        // Calculate the number of resumes generated today
        var totalResumesGeneratedToday = await CalculateResumesGeneratedToday(generatedResumeQueryable);
        
        // Calculate the number of resumes generated in the last 30 days
        var totalResumesGeneratedLast30Days = await CalculateResumesGeneratedLastNDays(generatedResumeQueryable, 30);
        
        // Calculate the number of users who signed up today
        var totalSignedUpUsersToday = await CalculateSignedUpUsersToday();

        // Calculate the number of users who signed up in the last 30 days
        var totalSignedUpUsersLast30Days = await CalculateSignedUpUsersLastNDays(30);
        
        // Calculate the number of users for each rating
        var ratingCountMap =  CalculateRatingCounts(allFeedback);
        
        //Calculates Number of Resumes With No Feedback
        var totalResumesWithNoFeedbacks = CalculateTotalResumesWithNoFeedbacks(allFeedback, totalResumeCount);
        
        //Calculates Number of Resumes With Feedback
        var totalResumesWithFeedbacks = CalculateTotalResumesWithFeedbacks(allFeedback);
        
        
        return new AnalyticsResponse()
        {
            TotalResumeCount = totalResumeCount,
            AverageRating = averageRating,
            TotalRegisteredUsers = totalUserCount,
            TopRatedComments = topRatedComments,
            LeastRatedComments = leastRatedComments,
            TotalResumesGeneratedToday = totalResumesGeneratedToday,
            TotalResumesGeneratedLast30Days = totalResumesGeneratedLast30Days,
            TotalSignedUpUsersToday = totalSignedUpUsersToday,
            TotalSignedUpUsersInLast30Days = totalSignedUpUsersLast30Days,
            RatingCountMap = ratingCountMap,
            TotalResumesWithNoFeedbacks = totalResumesWithNoFeedbacks,
            TotalResumesWithFeedbacks = totalResumesWithFeedbacks
        };
    }
    
    // Function to get top 3 rated comments
    private List<string> GetTopRatedComments(List<Feedback> allFeedback)
    {
        return allFeedback.OrderByDescending(feedback => feedback.Rating)
            .Take(3)
            .Select(feedback => feedback.Comment)
            .ToList();
    }

    // Function to get least 3 rated comments
    private List<string> GetLeastRatedComments(List<Feedback> allFeedback)
    {
        return allFeedback.OrderBy(feedback => feedback.Rating)
            .Take(3)
            .Select(feedback => feedback.Comment)
            .ToList();
    }

    private async Task<int> CalculateResumesGeneratedToday(IMongoQueryable<GeneratedResume> generatedResumeQueryable)
    {
        // Get the current date in UTC
        DateTime today = DateTime.UtcNow.Date;

        // Filter resumes created today
        var resumesGeneratedToday = generatedResumeQueryable
            .Where(gr => gr.CreatedAtUtc.Date == today);

        // Calculate the total number of resumes generated today
        var totalResumesGeneratedToday = await resumesGeneratedToday.CountAsync();

        return totalResumesGeneratedToday;
    }
    
    //Count of resumes generated in last 30 days
    private async Task<int> CalculateResumesGeneratedLastNDays(IMongoQueryable<GeneratedResume> generatedResumeQueryable, int days)
    {
        // Get the date N days ago from today
        DateTime startDate = DateTime.UtcNow.Date.AddDays(-days);

        // Filter resumes created in the last N days
        var resumesGeneratedLastNDays = generatedResumeQueryable
            .Where(gr => gr.CreatedAtUtc.Date >= startDate);

        // Calculate the total number of resumes generated in the last N days
        var totalResumesGeneratedLastNDays = await resumesGeneratedLastNDays.CountAsync();

        return totalResumesGeneratedLastNDays;
    }
    
    // Calculate the number of users who signed up today
    private async Task<int> CalculateSignedUpUsersToday()
    {
        // Get the current date in UTC
        DateTime today = DateTime.UtcNow.Date;

        // Filter users who signed up today
        var usersSignedUpToday = _userCollection
            .Find(u => u.CreatedOn.Date  == today);

        // Calculate the total number of users who signed up today
        var totalSignedUpUsersToday = await usersSignedUpToday.CountDocumentsAsync();

        return (int)totalSignedUpUsersToday;
    }

    // Calculate the number of users who signed up in the last 30 days
    private async Task<int> CalculateSignedUpUsersLastNDays(int days)
    {
        // Get the date N days ago from today
        DateTime startDate = DateTime.UtcNow.Date.AddDays(-days);

        // Filter users who signed up in the last N days
        var usersSignedUpLastNDays = _userCollection
            .Find(u => u.CreatedOn.Date >= startDate);

        // Calculate the total number of users who signed up in the last N days
        var totalSignedUpUsersLastNDays = await usersSignedUpLastNDays.CountDocumentsAsync();

        return (int)totalSignedUpUsersLastNDays;
    }
    
    // Calculate the number of users for each rating
    private Dictionary<int, int> CalculateRatingCounts(List<Feedback> allFeedback)
    {
        // Initialize the dictionary to store rating counts
        var ratingCounts = new Dictionary<int, int>();


        // Iterate over each generated resume and count the ratings
        foreach (var feedback in allFeedback)
        {
            if (feedback != null)
            {
                int rating = (int)feedback.Rating;

                // Update the rating count in the dictionary
                if (ratingCounts.ContainsKey(rating))
                {
                    ratingCounts[rating]++;
                }
                else
                {
                    ratingCounts[rating] = 1;
                }
            }
        }

        return ratingCounts;
    }
    
    //Calculates Number of Resumes With No Feedback
    private int CalculateTotalResumesWithNoFeedbacks(List<Feedback> allFeedback,int totalResumes){
        return totalResumes-allFeedback.Count;
    }
    
    //Calculates Number of Resumes With Feedback
    private int CalculateTotalResumesWithFeedbacks(List<Feedback> allFeedback){
        return allFeedback.Count;
    }
}



