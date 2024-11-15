using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PortalMartins.INFRA;
using PortalMartins.INFRA.Context;

namespace PortalMartins.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            // Services
            builder.Services.InfraConfiguration(builder.Configuration);
            builder.Services.ApiConfiguration();
            builder.Services.AuthenticatorConfiguration(builder.Configuration);
            builder.Services.AddHttpContextAccessor();

            // Controller
            builder.Services.AddControllers();

            // Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(
               x =>
               {
                   x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                   {
                       Name = "Authorization",
                       In = ParameterLocation.Header,
                       Type = SecuritySchemeType.ApiKey,
                       Scheme = "Bearer",
                   });

                   x.AddSecurityRequirement(new OpenApiSecurityRequirement()
                   {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer",
                                },
                            },
                           new List<string>()
                        },
                   });

                   x.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAppCresce.API", Version = "v1" });
                   x.TagActionsBy(api => [api.GroupName ?? "Default"]);
                   x.DocInclusionPredicate((name, api) => true);
               }
               );

            // Build
            WebApplication app = builder.Build();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            CreateDatabase(app);

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

        private static void CreateDatabase(WebApplication app)
        {
            try
            {
                IServiceScope ScopeService = app.Services.CreateScope();
                AppDBContext? context = ScopeService.ServiceProvider.GetService<AppDBContext>();

                context?.Database.EnsureCreated();
                context?.Database.Migrate();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
