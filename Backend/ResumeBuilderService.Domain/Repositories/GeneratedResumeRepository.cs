using System.Linq.Expressions;
using MongoDB.Driver;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.Domain.Repositories;

public class GeneratedResumeRepository : IGeneratedResumeRepository
{
    private readonly IRepository<GeneratedResume> _repository;
    public GeneratedResumeRepository(IRepository<GeneratedResume> repository)
    {
        _repository = repository;
    }

    public IQueryable<GeneratedResume> Table => _repository.Table;

    public async Task<List<GeneratedResume>> GetAll(Expression<Func<GeneratedResume, bool>> filter = null)
    {
        return await _repository.GetAll(filter);
    }

    public async Task<GeneratedResume> InsertAsync(GeneratedResume generatedResume, IClientSessionHandle? sessionHandle = null)
    {
        generatedResume.SetCreatedAtToNow(DateTime.UtcNow);
        generatedResume.SetUpdatedAtToNow(DateTime.UtcNow);
        return await _repository.InsertAsync(generatedResume);
    }
    
    public async Task<GeneratedResume> UpdateAsync(GeneratedResume generatedResume, IClientSessionHandle? sessionHandle = null)
    {
        generatedResume.SetCreatedAtToNow(DateTime.UtcNow);
        generatedResume.SetUpdatedAtToNow(DateTime.UtcNow);
        return await _repository.UpdateAsync(generatedResume);
    }
}