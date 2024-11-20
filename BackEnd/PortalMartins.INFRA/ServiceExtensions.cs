using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PortalMartins.CORE.Interfaces;
using PortalMartins.INFRA.Context;
using PortalMartins.INFRA.Repositories;

namespace PortalMartins.INFRA
{
    public static class ServiceExtensions
    {
        public static void InfraConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("sql")!;

            services.AddDbContext<AppDBContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPostRepository, PostRepository>();
        }
    }
}
