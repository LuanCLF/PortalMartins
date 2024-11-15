using Microsoft.EntityFrameworkCore;
using PortalMartins.CORE.Entities;

namespace PortalMartins.INFRA.Context
{
    public class AppDBContext(DbContextOptions<AppDBContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Hosting> Hostings { get; set; }
        public DbSet<Feeding> Feedings { get; set; }
        public DbSet<Events> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasMany(u => u.Posts).WithOne().HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Post>().ToTable("Post");
            builder.Entity<Hosting>().ToTable("Hosting");
            builder.Entity<Feeding>().ToTable("Feeding");
            builder.Entity<Events>().ToTable("Events");

            builder.Entity<Hosting>().HasOne<Post>().WithOne().HasForeignKey<Hosting>(h => h.Id);

            builder.Entity<Feeding>().HasOne<Post>().WithOne().HasForeignKey<Feeding>(f => f.Id);

            builder.Entity<Events>().HasOne<Post>().WithOne().HasForeignKey<Events>(e => e.Id);
        }
    }

}
    