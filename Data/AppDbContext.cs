using LamWebNe.Model;
using Microsoft.EntityFrameworkCore;

namespace LamWebNe.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderDetail> OrderDetails => Set<OrderDetail>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 🔒 Soft delete filters
            modelBuilder.Entity<Category>().HasQueryFilter(e => e.DeletedAt == null);
            modelBuilder.Entity<User>().HasQueryFilter(e => e.DeletedAt == null);
            modelBuilder.Entity<Order>().HasQueryFilter(e => e.DeletedAt == null);
            modelBuilder.Entity<OrderDetail>().HasQueryFilter(e => e.DeletedAt == null);
            modelBuilder.Entity<Product>().HasQueryFilter(e => e.DeletedAt == null);

            // 💰 Fix decimal(18,2) cho Price
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);


            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 3,
                    Username = "admin",
                    Password = "123456",
                    Gmail = "admin@gmail.com",
                    Role = "Admin",
                    CreatedAt = new DateTime(2024, 04, 18, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}
