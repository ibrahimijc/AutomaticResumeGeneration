using Microsoft.OpenApi.Models;
using ResumeBuilderService.API.HostedServices;
using ResumeBuilderService.API.Services;
using ResumeBuilderService.Domain.Extensions;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
const string corsPolicy = "CustomizeResumeCorsPolicy";

builder.Services.AddMongo(builder.Configuration);
builder.Services.RegisterAuthentication();
builder.Services.AddBusinessLogicLayer();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CustomizedResumeServiceApi", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });
    // Apply the security scheme globally to all operations
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] {}
        }
    });
});

builder.Services.AddCors(options =>
    options.AddPolicy(name: corsPolicy, builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
builder.Services.AddHostedService<DatabaseInitHostedService>();
builder.Host.UseSerilog((hostingContext, s, loggerConfiguration) =>
    loggerConfiguration
        .WriteTo.Console()
        .ReadFrom.Configuration(hostingContext.Configuration)
        .ReadFrom.Services(s)
        .Enrich.FromLogContext());

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseSerilogRequestLogging();
app.UseCors(corsPolicy);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();