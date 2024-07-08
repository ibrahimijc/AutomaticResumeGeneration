using MongoDB.Driver;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.Domain.Repositories.Interfaces;

public interface IBasicDetailsRepository
{
    IQueryable<BasicDetails> Table { get; }
    public Task<BasicDetails> GetByUserId(string userId);
    Task<BasicDetails> InsertAsync(BasicDetails basicDetails, IClientSessionHandle? sessionHandle = null);
    Task<BasicDetails> UpdateAsync(BasicDetails basicDetails, IClientSessionHandle? sessionHandle = null);

}