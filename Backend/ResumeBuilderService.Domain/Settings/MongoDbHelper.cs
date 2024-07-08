using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;

namespace ResumeBuilderService.Domain.Settings;

public static class MongoDbHelper
    {
        public static IMongoClient CreateClient(MongoSettings configuration)
        {
            var options = configuration.Options;
            var connectionString = AppendQueryParam(configuration.ConnectionString, "readPreference", options.ReadPreference);
            if (options.MaxStalenessSeconds > 0)
            {
                connectionString = AppendQueryParam(connectionString, "maxStalenessSeconds", options.MaxStalenessSeconds);
            }
            var settings = MongoClientSettings.FromConnectionString(connectionString);
#pragma warning disable 618
            settings.WaitQueueSize = Int32.MaxValue;
#pragma warning restore 618
            if (options.MaxConnectionPoolSize > 0)
            {
                settings.MaxConnectionPoolSize = options.MaxConnectionPoolSize;
            }
            if (options.MinConnectionPoolSize > 0)
            {
                settings.MinConnectionPoolSize = options.MinConnectionPoolSize;
            }
            if (options.MaxConnectionIdleTime > 0)
            {
                settings.MaxConnectionIdleTime = TimeSpan.FromSeconds(options.MaxConnectionIdleTime);
            }
            if (options.MaxConnectionLifeTime > 0)
            {
                settings.MaxConnectionLifeTime = TimeSpan.FromSeconds(options.MaxConnectionLifeTime);
            }
            var totalConnections = 0;
            settings.ClusterConfigurator = (x) =>
            {
                // x.Subscribe<CommandSucceededEvent>(x =>
                // {
                //     Log.Info($"{x.CommandName}  {x.Duration}");
                // });
                x.ConfigureConnectionPool(y =>
                    new ConnectionPoolSettings(
                        maxConnections: options.MaxConnectionPoolSize,
                        minConnections: options.MinConnectionPoolSize)
                );
            };

            var client = new MongoClient(settings);
            return client;
        }

        private static string AppendQueryParam(string connectionString, string paramName, object paramValue)
        {
            if (paramValue == null || string.IsNullOrWhiteSpace(paramValue.ToString()))
            {
                return connectionString;
            }
            var concatChar = string.Empty;
            if (!connectionString.Contains("?"))
            {
                concatChar = "?";
            }
            else if (!connectionString.EndsWith("?"))
            {
                concatChar = "&";
            }
            return $"{connectionString}{concatChar}{paramName}={paramValue}";
        }
    }