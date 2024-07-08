using System.Linq.Expressions;
using MongoDB.Driver;
using ResumeBuilderService.Domain.Entities;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.Domain.Repositories.Interfaces;

public interface IGeneratedResumeRepository
{
    IQueryable<GeneratedResume> Table { get; }
    Task<List<GeneratedResume>> GetAll(Expression<Func<GeneratedResume, bool>> filter = null);
    Task<GeneratedResume> InsertAsync(GeneratedResume generatedResume, IClientSessionHandle? sessionHandle = null);
    Task<GeneratedResume> UpdateAsync(GeneratedResume generatedResume, IClientSessionHandle? sessionHandle = null);
}