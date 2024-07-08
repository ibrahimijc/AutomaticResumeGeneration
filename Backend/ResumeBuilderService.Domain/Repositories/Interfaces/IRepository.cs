using System.Linq.Expressions;
using MongoDB.Driver;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.Domain.Repositories.Interfaces;

public interface IRepository<T> where T : BaseEntity
{
    Task<T> GetByIdAsync(string id);
    Task<List<T>> GetAll(Expression<Func<T, bool>> filter = null);
    IQueryable<T> Table { get; }
    Task<T> InsertAsync(T entity, IClientSessionHandle? sessionHandle = null);
    Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> filter);
    Task<T> UpdateAsync(T entity, IClientSessionHandle? sessionHandle = null);
    Task<IEnumerable<T>> UpdateAsync(IEnumerable<T> entities, IClientSessionHandle? sessionHandle = null);
    Task<T> DeleteAsync(T entity, IClientSessionHandle? sessionHandle = null);
    Task<IEnumerable<T>> DeleteAsync(IEnumerable<T> entities, IClientSessionHandle? sessionHandle = null);
}