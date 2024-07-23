using BookStoreClean2.CoreLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookStoreClean.InfrastructureLayer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base (options) { }
    
    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(24).IsRequired();
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
        });
        modelBuilder.Entity<User>().HasIndex(user => user.Username).IsUnique();
        
    }
}