using System.Linq.Expressions;
using MongoDB.Driver;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.Domain.Repositories;

public class BasicDetailsRepository : IBasicDetailsRepository
{
    private readonly IRepository<BasicDetails> _repository;

    public BasicDetailsRepository(IRepository<BasicDetails> repository)
    {
        _repository = repository;
    }

    public IQueryable<BasicDetails> Table => _repository.Table;

    public async Task<BasicDetails> GetByUserId(string userId)
    {
        return await _repository.FirstOrDefaultAsync(x => x.UserId == userId);
    }
    
    public virtual async Task<BasicDetails> FirstOrDefaultAsync(Expression<Func<BasicDetails, bool>> filter)
    {
        return await _repository.FirstOrDefaultAsync(filter);
    }

    public async Task<BasicDetails> InsertAsync(BasicDetails basicDetails, IClientSessionHandle? sessionHandle = null)
    {
        basicDetails.SetCreatedAtToNow(DateTime.UtcNow);
        basicDetails.SetUpdatedAtToNow(DateTime.UtcNow);
        return await _repository.InsertAsync(basicDetails);
    }
    
    public async Task<BasicDetails> UpdateAsync(BasicDetails basicDetails, IClientSessionHandle? sessionHandle = null)
    {
        basicDetails.SetCreatedAtToNow(DateTime.UtcNow);
        basicDetails.SetUpdatedAtToNow(DateTime.UtcNow);
        return await _repository.UpdateAsync(basicDetails);
    }
}