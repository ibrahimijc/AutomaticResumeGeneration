using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ResumeBuilderService.Domain.Models;

namespace ResumeBuilderService.Domain.Repositories;

// public class UserRepository : IUserRepository
// {
//     private readonly IRepository<User> _repository;
//     public UserRepository(IRepository<User> repository)
//     {
//         _repository = repository;
//     }
//     
//     public async Task<User> GetByIdOrThrowsAsync(string id)
//     {
//         return await _repository.GetByIdAsync(id) ??
//                throw new KeyNotFoundException($"{nameof(User)} with Id #{id} not found.");
//     }
//     public IQueryable<User> Table => _repository.Table;
//
//     public async Task<User> InsertAsync(User entity, IClientSessionHandle? sessionHandle = null)
//     {
//         entity.InitializeInsert("System", DateTime.UtcNow);
//         return await _repository.InsertAsync(entity, sessionHandle);
//     }
//     
//     public async Task<User> UpdateAsync(User entity, IClientSessionHandle? sessionHandle = null)
//     {
//         entity.InitializeUpdate("System", DateTime.UtcNow);
//         return await _repository.UpdateAsync(entity, sessionHandle);
//     }
//     
//     public async Task<User> DeleteAsync(User entity, IClientSessionHandle? sessionHandle = null)
//     {
//         return await _repository.DeleteAsync(entity, sessionHandle);
//     }
// }