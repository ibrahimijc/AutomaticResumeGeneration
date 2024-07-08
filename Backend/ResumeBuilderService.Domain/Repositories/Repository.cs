using System.Linq.Expressions;
using MongoDB.Driver;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.Domain.Repositories;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected IMongoCollection<T> _collection;
    protected IMongoDatabase _database;

    public IMongoCollection<T> Collection
    {
        get { return _collection; }
    }

    public IMongoDatabase Database
    {
        get { return _database; }
    }

    public Repository(IMongoDatabase database)
    {
        _database = database;
        _collection = _database.GetCollection<T>(typeof(T).Name);
    }

    public async Task<T> GetByIdAsync(string id)
    {
        return await (await _collection.FindAsync(e => e.Id == id)).FirstOrDefaultAsync();
    }
    
    public virtual async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> filter)
    {
        return await _collection.Find(filter).FirstOrDefaultAsync();
    }
    
    public virtual async Task<List<T>> GetAll(Expression<Func<T, bool>> filter = null)
    {
        var resultSet = new List<T>();
        if (filter != null)
        {
            FilterDefinition<T> mongoFilter = filter;
            resultSet.AddRange(await (await _collection.FindAsync(mongoFilter)).ToListAsync());
        }
        else
        {
            resultSet.AddRange(await (await _collection.FindAsync(Builders<T>.Filter.Empty)).ToListAsync());
        }
        return resultSet;
    }


    public async Task<T> InsertAsync(T entity, IClientSessionHandle? sessionHandle = default(IClientSessionHandle?))
    {
        if (sessionHandle != null)
        {
            await _collection.InsertOneAsync(sessionHandle, entity);
        }
        else
        {
            await _collection.InsertOneAsync(entity);
        }

        return entity;
    }

    public virtual IQueryable<T> Table
    {
        get { return _collection.AsQueryable(); }
    }
    
    public virtual async Task<IEnumerable<T>> UpdateAsync(IEnumerable<T> entities, IClientSessionHandle? sessionHandle = null)
    {
        var baseEntities = entities as T[] ?? entities.ToArray();
        foreach (var entity in baseEntities)
        {
            await UpdateAsync(entity, sessionHandle);
        }
        return baseEntities;
    }
    
    public virtual async Task<T> UpdateAsync(T entity, IClientSessionHandle? sessionHandle = null)
    {
        if (sessionHandle != null)
        {
            await _collection.ReplaceOneAsync(sessionHandle, x => x.Id == entity.Id, entity, new ReplaceOptions() { IsUpsert = false });
        }
        else
        {
            await _collection.ReplaceOneAsync( x => x.Id == entity.Id, entity, new ReplaceOptions() { IsUpsert = false });
        }
        return entity;
    }
    public virtual async Task<T> DeleteAsync(T entity, IClientSessionHandle? sessionHandle = null)
    {
        if (sessionHandle != null)
        {
            await _collection.DeleteOneAsync(sessionHandle, e => e.Id == entity.Id);
        }
        else
        {
            await _collection.DeleteOneAsync(e => e.Id == entity.Id);
        }
        return entity;
    }

    public virtual async Task<IEnumerable<T>> DeleteAsync(IEnumerable<T> entities, IClientSessionHandle? sessionHandle = null)
    {
        var baseEntities = entities as T[] ?? entities.ToArray();

        foreach (T entity in baseEntities)
        {
            await DeleteAsync(entity, sessionHandle);
        }
        return baseEntities;
    }

}