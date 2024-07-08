using System.Text;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace ResumeBuilderService.API.Extensions;

// public static class MongoIdentityExtension
// {
//     public static void RegisterMongoIdentity(this IServiceCollection services)
//     {
//         //add mongoIdentityConfiguration...
//         var mongoDbIdentityConfig = new MongoDbIdentityConfiguration
//         {
//             MongoDbSettings = new MongoDbSettings()
//             {
//                 ConnectionString = "mongodb://localhost:27017",
//                 DatabaseName = "CustomizedResumeService"
//             },
//             IdentityOptionsAction = options =>
//             {
//                 options.Password.RequireDigit = false;
//                 options.Password.RequiredLength = 8;
//                 options.Password.RequireNonAlphanumeric = true;
//                 options.Password.RequireLowercase = false;
//
//                 //lockout
//                 options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
//                 options.Lockout.MaxFailedAccessAttempts = 5;
//
//                 options.User.RequireUniqueEmail = true;
//
//             }
//
//         };
//
//         services.ConfigureMongoDbIdentity<ApplicationUser, ApplicationRole, Guid>(mongoDbIdentityConfig)
//             .AddUserManager<UserManager<ApplicationUser>>()
//             .AddSignInManager<SignInManager<ApplicationUser>>()
//             .AddRoleManager<RoleManager<ApplicationRole>>()
//             .AddDefaultTokenProviders();
//
//         services.AddAuthentication(x =>
//         {
//             x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//             x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//
//
//         }).AddJwtBearer(x =>
//         {
//             x.RequireHttpsMetadata = true;
//             x.SaveToken = true;
//             x.TokenValidationParameters = new TokenValidationParameters
//             {
//                 ValidateIssuerSigningKey = true,
//                 ValidateIssuer = true,
//                 ValidateAudience = true,
//                 ValidateLifetime = true,
//                 ValidIssuer = "https://localhost:5001",
//                 ValidAudience = "https://localhost:5001",
//                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1swek3u4uo2u4a6e")),
//                 ClockSkew = TimeSpan.Zero
//
//             };
//         });
//
//     }
// }