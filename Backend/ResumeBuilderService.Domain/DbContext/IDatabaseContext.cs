using ResumeBuilderService.Domain.DbContext.Misc;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.Domain.DbContext;

public interface IDatabaseContext
{
    public void EnsureCollectionExists(string collectionName);

    public Task CreateIndex<T>(IRepository<T> repository, OrderBuilder<T> orderBuilder, string indexName,
        bool unique = false, bool sparse = false) where T : BaseEntity;
}