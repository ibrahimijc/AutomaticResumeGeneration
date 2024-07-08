using MongoDB.Driver;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.Domain.Repositories.Interfaces;

public interface IUserRepository
{
    IQueryable<User> Table { get; }
    Task<User> GetByIdOrThrowsAsync(string id);
    Task<User> InsertAsync(User User, IClientSessionHandle? sessionHandle = null);
    Task<User> UpdateAsync(User User, IClientSessionHandle? sessionHandle=null); 

    Task<User> DeleteAsync(User User, IClientSessionHandle? sessionHandle=null); 
}