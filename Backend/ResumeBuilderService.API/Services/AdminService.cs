using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ResumeBuilderService.API.Contracts.Request;
using ResumeBuilderService.API.Contracts.Response;
using ResumeBuilderService.API.Services.Interfaces;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.API.Services;

public class AdminService : IAdminService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMongoCollection<User> _userCollection;
    
    public AdminService(IUnitOfWork unitOfWork,IMongoDatabase mongoDatabase)
    {
        _unitOfWork = unitOfWork;
        _userCollection = mongoDatabase.GetCollection<User>("users");
    }

    public async Task<PageResponse<User>> GetApprovedUsers(PageRequest pageRequest,string? loggedInUserId)
    {
        ValidateAdminUser(loggedInUserId);
        var filter = Builders<User>.Filter.Eq(u => u.IsApproved, false);
        var unapprovedUsersCursor = _userCollection.Find(filter);
        
        unapprovedUsersCursor = unapprovedUsersCursor.Limit(pageRequest.PageSize);
        unapprovedUsersCursor = unapprovedUsersCursor.Skip((pageRequest.PageNo - 1) * pageRequest.PageSize);
        
        var unapprovedUsers = await unapprovedUsersCursor.ToListAsync();
        var totalUnapprovedUsersCount = unapprovedUsers.Count;
        
        return new PageResponse<User>(unapprovedUsers, pageRequest.PageNo, pageRequest.PageSize, totalUnapprovedUsersCount);
    }

    public async Task<PageResponse<User>> GetUnApprovedUsers(PageRequest pageRequest,string? loggedInUserId)
    {
       ValidateAdminUser(loggedInUserId); 

        var filter = Builders<User>.Filter.Eq(u => u.IsApproved, false);
        var unapprovedUsersCursor = _userCollection.Find(filter);
        
        unapprovedUsersCursor = unapprovedUsersCursor.Limit(pageRequest.PageSize);
        unapprovedUsersCursor = unapprovedUsersCursor.Skip((pageRequest.PageNo - 1) * pageRequest.PageSize);
        
        var unapprovedUsers = await unapprovedUsersCursor.ToListAsync();
        var totalUnapprovedUsersCount = unapprovedUsers.Count;
        
        return new PageResponse<User>(unapprovedUsers, pageRequest.PageNo, pageRequest.PageSize, totalUnapprovedUsersCount);
    }

    public async Task<PageResponse<GeneratedResume>> GetGeneratedResumes(PageRequest pageRequest, string? loggedInUserId)
    {
        ValidateAdminUser(loggedInUserId);
        var generatedResumeQueryable = (IMongoQueryable<GeneratedResume>)_unitOfWork.GeneratedResumeRepository.Table;
        
        // Pagination logic
        generatedResumeQueryable = generatedResumeQueryable.Skip((pageRequest.PageNo - 1) * pageRequest.PageSize);
        generatedResumeQueryable = generatedResumeQueryable.Take(pageRequest.PageSize);

        // Execute the query and retrieve resumes for the current page
        var resumes = await generatedResumeQueryable.ToListAsync();

        // Get the total count of resumes (optional for pagination metadata)
        var totalResumesCount = await generatedResumeQueryable.CountAsync();

        // Return a PageResponse object containing data and pagination information
        return new PageResponse<GeneratedResume>(resumes, pageRequest.PageNo, pageRequest.PageSize, totalResumesCount);
    }

    public async Task<PageResponse<BasicDetails>> GetBasicDetailsOfAllResumes(PageRequest pageRequest,string? loggedInUserId)
    {
        ValidateAdminUser(loggedInUserId);
        var basicDetailsResumeQueryable = (IMongoQueryable<BasicDetails>)_unitOfWork.BasicDetailsRepository.Table;
        
        basicDetailsResumeQueryable = basicDetailsResumeQueryable.Skip((pageRequest.PageNo - 1) * pageRequest.PageSize);
        basicDetailsResumeQueryable = basicDetailsResumeQueryable.Take(pageRequest.PageSize);
        
        var basicDetails = await basicDetailsResumeQueryable.ToListAsync();
        var basicDetailsCount = await basicDetailsResumeQueryable.CountAsync();
        
        return new PageResponse<BasicDetails>(basicDetails, pageRequest.PageNo, pageRequest.PageSize, basicDetailsCount);
    }

    public async Task<Boolean> ApproveUser(string? userId, string? loggedInUserId)
    {
        ValidateAdminUser(loggedInUserId);
        // Convert the userId string to an ObjectId
        var objectId = new ObjectId(userId);

        // Create the filter to find the user by userId
        var filter = Builders<User>.Filter.Eq(u => u.Id, objectId);

        // Create the update definition to set IsApproved to true
        var update = Builders<User>.Update.Set(u => u.IsApproved, true);

        // Perform the update operation
        var result = await _userCollection.UpdateOneAsync(filter, update);

        // Check if the user was found and updated
        if (result.IsAcknowledged && result.ModifiedCount > 0)
        {
            return true;
        }
        else
        {
            // If user is not found, throw an exception
            throw new Exception($"User with ID '{userId}' not found.");
        }
    }

    private async void ValidateAdminUser(string? loggedInUserId)
    {
        if (string.IsNullOrEmpty(loggedInUserId)) 
            throw new InvalidOperationException("User Id not found.");
        
        var user = await _userCollection.Aggregate().Match(x => x.Id == ObjectId.Parse(loggedInUserId)).FirstOrDefaultAsync();
        
        if (!user.IsAdmin)
            throw new InvalidOperationException("Unauthorized access.");
    }

    public async Task<GeneratedResume> GetGeneratedResumeById(string? loggedInUserId, string resumeId)
    {
        
        ValidateAdminUser(loggedInUserId);

        if (string.IsNullOrEmpty(resumeId))
        {
            throw new ArgumentNullException(nameof(resumeId), "Resume ID cannot be null or empty.");
        }

        var generatedResumeQueryable = (IMongoQueryable<GeneratedResume>)_unitOfWork.GeneratedResumeRepository.Table;
        
        Expression<Func<GeneratedResume, bool>> filterExpression = r => r.Id == resumeId;
        var generatedResumeTask = generatedResumeQueryable.FirstOrDefaultAsync(filterExpression);
        
        return await generatedResumeTask;
    }
    
    public async Task<BasicDetails> GetBasicDetailsById(string? loggedInUserId, string basicDetailsId)
    {
        ValidateAdminUser(loggedInUserId);
        
        if (string.IsNullOrEmpty(basicDetailsId))
        {
            throw new ArgumentNullException(nameof(basicDetailsId), "Resume ID cannot be null or empty.");
        }

        var basicDetailsQueryable = (IMongoQueryable<BasicDetails>)_unitOfWork.BasicDetailsRepository.Table;

        // Filter by ID using a lambda expression (flexible)
        Expression<Func<BasicDetails, bool>> filterExpression = r => r.Id == basicDetailsId;
        var basicDetail = basicDetailsQueryable.FirstOrDefaultAsync(filterExpression);
        // Execute query asynchronously and return result
        return await basicDetail;
    }
}