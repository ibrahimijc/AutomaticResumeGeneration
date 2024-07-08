using ResumeBuilderService.Domain.DbContext;
using ResumeBuilderService.Domain.DbContext.Misc;
using ResumeBuilderService.Domain.Models;
using ResumeBuilderService.Domain.Repositories;
using ResumeBuilderService.Domain.Repositories.Interfaces;

namespace ResumeBuilderService.API.HostedServices;

public class DatabaseInitHostedService : IHostedService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public DatabaseInitHostedService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var databaseContext = scope.ServiceProvider.GetRequiredService<IDatabaseContext>();
                var basicDetailsRepository = scope.ServiceProvider.GetRequiredService<IRepository<BasicDetails>>();
                
                //Ensure Collections Exists
                databaseContext.EnsureCollectionExists(nameof(BasicDetails));
                databaseContext.EnsureCollectionExists(nameof(User));
                //Create Indexes

                await databaseContext.CreateIndex(basicDetailsRepository,
                    OrderBuilder<BasicDetails>.Create()
                        .Ascending(x => x.UserId),"UniqueUserDetails",true);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }