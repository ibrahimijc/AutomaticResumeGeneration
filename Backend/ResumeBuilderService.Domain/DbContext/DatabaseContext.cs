using MongoDB.Bson;
using MongoDB.Driver;
using ResumeBuilderService.Domain.DbContext.Misc;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.Domain.DbContext;

public class DatabaseContext : IDatabaseContext
{
    protected IMongoDatabase _database;
    protected IMongoClient _mongoClient;
        
    public DatabaseContext()
    {
    }

    public DatabaseContext(IMongoDatabase mongodatabase, IMongoClient mongoClient)
    {
        _database = mongodatabase;
        _mongoClient = mongoClient;
    }

    public IMongoDatabase Database()
    {
        return _database;
    }

    public IQueryable<T> Table<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName).AsQueryable();
    }
        
    public async Task CreateTable(string name, string collation)
    {
        var database = _database ?? throw new ArgumentNullException();

        if (!string.IsNullOrWhiteSpace(collation))
        {
            var options = new CreateCollectionOptions();
            options.Collation = new Collation(collation);
            await database.CreateCollectionAsync(name, options);
        }
        else
            await database.CreateCollectionAsync(name);
    }
    
    public async Task CreateIndex<T>(IRepository<T> repository, OrderBuilder<T> orderBuilder, string indexName, bool unique = false, bool sparse = false) where T : BaseEntity
    {
        IList<IndexKeysDefinition<T>> keys = new List<IndexKeysDefinition<T>>();
        foreach (var item in orderBuilder.Fields)
        {
            if (item.selector != null)
            {
                if (item.value)
                {
                    keys.Add(Builders<T>.IndexKeys.Ascending(item.selector));
                }
                else
                {
                    keys.Add(Builders<T>.IndexKeys.Descending(item.selector));
                }
            }
            else
            {
                if (item.value)
                {
                    keys.Add(Builders<T>.IndexKeys.Ascending(item.fieldName));
                }
                else
                {
                    keys.Add(Builders<T>.IndexKeys.Descending(item.fieldName));
                }
            }
        }

        try
        {
            await ((Repository<T>)repository).Collection.Indexes.CreateOneAsync(new CreateIndexModel<T>(Builders<T>.IndexKeys.Combine(keys),
                new CreateIndexOptions() { Name = indexName, Unique = unique, Sparse = sparse}));
        }
        catch { }
    }

    
    public void EnsureCollectionExists(string collectionName)
    {
        var filter = new BsonDocument("name", collectionName);
        var options = new ListCollectionNamesOptions { Filter = filter };
        var exists = _database.ListCollectionNames(options).Any();
        if (!exists)
        {
            _database.CreateCollection(collectionName);
        }
    }
}