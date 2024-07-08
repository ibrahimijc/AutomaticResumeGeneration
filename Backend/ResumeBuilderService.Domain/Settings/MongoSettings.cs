namespace ResumeBuilderService.Domain.Settings;

public class MongoSettings
{
    public MongoSettings()
    {
    }

    public string ConnectionString { get; set; }

    public MongoOptions Options { get; set; }

    public string DatabaseName { get; set; }
}

public class MongoOptions
{
    public string ReadPreference { get; set; }

    public int MaxStalenessSeconds { get; set; }

    public int MinConnectionPoolSize { get; set; }

    public int MaxConnectionPoolSize { get; set; }

    public int MaxConnectionIdleTime { get; set; }

    public int MaxConnectionLifeTime { get; set; }
}