using Microsoft.EntityFrameworkCore;
using NguyenTruongSinh_2122110236.Model;
using System;

namespace NguyenTruongSinh_2122110236.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }
    }
}
