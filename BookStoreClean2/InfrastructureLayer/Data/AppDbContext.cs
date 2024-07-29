using BookStoreClean2.CoreLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookStoreClean.InfrastructureLayer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base (options) { }
    
    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }
    
    public DbSet<Library> UserBooks { get; set; }
    
    public DbSet<Role> Roles { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(24).IsRequired();
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
        });
        modelBuilder.Entity<User>().HasIndex(user => user.Username).IsUnique();
        
        modelBuilder.Entity<Library>()
            .HasKey(ub => new { ub.UserId, ub.BookId });

        modelBuilder.Entity<Library>()
            .HasOne(ub => ub.User)
            .WithMany(u => u.UserBooks)
            .HasForeignKey(ub => ub.UserId);

        modelBuilder.Entity<Library>()
            .HasOne(ub => ub.Book)
            .WithMany(b => b.UserBooks)
            .HasForeignKey(ub => ub.BookId);
        
        modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

    }
}