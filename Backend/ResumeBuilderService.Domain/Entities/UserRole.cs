using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;

namespace ResumeBuilderService.Domain.Models;

public class UserRole : MongoIdentityRole<ObjectId>
{
        
}