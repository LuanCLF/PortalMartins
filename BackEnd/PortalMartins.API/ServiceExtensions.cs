using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using PortalMartins.API.Utilities;
using PortalMartins.CORE.Interfaces.IUtilities;
using System.Text;

namespace PortalMartins.API
{
    public static class ServiceExtensions
    {
        public static void ApiConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IEncryptor, Encryptor>();
            services.AddScoped<IAuthenticator, Authenticator>();
            services.AddScoped<IImage, Image>();
        }

        public static void AuthenticatorConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            byte[] key = Encoding.UTF8.GetBytes(configuration["Key"]!);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

                x.Events = new JwtBearerEvents
                {
                    OnChallenge = context =>
                    {
                        context.HandleResponse();
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        context.Response.ContentType = "application/json";
                        var json = System.Text.Json.JsonSerializer.Serialize(new { erro = "Unauthorized user" });
                        return context.Response.WriteAsync(json);
                    },
                };
            });
        }
    }
}