using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using ResumeBuilderService.Domain.DbContext;
using ResumeBuilderService.Domain.Repositories;
using ResumeBuilderService.Domain.Repositories.Interfaces;
using ResumeBuilderService.Domain.Settings;

namespace ResumeBuilderService.Domain.Extensions;

public static class ServicesCollectionExtensions
{
    public static IServiceCollection AddMongo(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<MongoSettings>(context =>
        {
            var configuration = context.GetRequiredService<IConfiguration>();
            var options = configuration.GetSection("mongo").Get<MongoSettings>();
            return options;
        });
            
        services.AddSingleton<IMongoClient>(context =>
        {
            var mongoSettings = context.GetRequiredService<MongoSettings>();
            var mongoClient = MongoDbHelper.CreateClient(mongoSettings);
            return mongoClient;
        });
            
        services.AddScoped<IMongoDatabase>(context =>
        {
            var mongoSettings = context.GetRequiredService<MongoSettings>();
            var mongoClient = context.GetRequiredService<IMongoClient>();
            return mongoClient.GetDatabase(mongoSettings.DatabaseName);
        });

        services.RegisterMongoIdentity(configuration);
        services.AddScoped<IDatabaseContext, DatabaseContext>();
        services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        return services;
    }

}