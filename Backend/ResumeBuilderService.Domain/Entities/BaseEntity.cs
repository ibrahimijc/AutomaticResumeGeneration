using MongoDB.Bson;

namespace ResumeBuilderService.Domain.Models;

public abstract class BaseEntity
{
    protected BaseEntity()
    {
        _id = ObjectId.GenerateNewId().ToString();
    }

    public string Id
    {
        get => _id;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                _id = ObjectId.GenerateNewId().ToString();
            else
                _id = value;
        }
    }

    private string _id;
        
    public DateTime CreatedAtUtc { get; private set; }
    public DateTime UpdatedAtUtc { get; private set; }
    public string CreatedBy { get; private set; }
    public string UpdatedBy { get; private set; }

    public void SetCreatedAtToNow(DateTime dateTime)
    {
        CreatedAtUtc = dateTime;
    }
        
    public void SetUpdatedAtToNow(DateTime dateTime)
    {
        UpdatedAtUtc = dateTime;
    }

    public void SetCreatedBy(string createdBy)
    {
        CreatedBy = createdBy;
    }

    public void SetUpdatedBy(string updatedBy)
    {
        UpdatedBy = updatedBy;
    }

    public void InitializeInsert(string userEmail, DateTime dateTime)
    {
        SetCreatedAtToNow(dateTime);
        SetUpdatedAtToNow(dateTime);
        SetCreatedBy(userEmail);
        SetUpdatedBy(userEmail);
    }
        
    public void InitializeUpdate(string userId, DateTime dateTime)
    {
        SetUpdatedAtToNow(dateTime);
        SetUpdatedBy(userId);
    }
}