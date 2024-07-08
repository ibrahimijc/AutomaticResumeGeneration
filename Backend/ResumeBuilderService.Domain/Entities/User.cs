using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;
using ResumeBuilderService.Domain.Constants;

namespace ResumeBuilderService.Domain.Models;

public class User : MongoIdentityUser<ObjectId>
{
    public string FullName { get; set; } = string.Empty;
    public int UserType { get; set; } = (int) UserTypeEnum.User;
    public bool IsAdmin => (int)UserTypeEnum.Admin == UserType;
    public bool IsApproved { get; set; } = false;
}