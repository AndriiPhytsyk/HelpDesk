using System;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
                : base(options)
        { }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserProject>()
                .HasKey(t => new { t.UserID, t.ProjectID });

            modelBuilder.Entity<UserProject>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.UserProjects)
                .HasForeignKey(pt => pt.UserID);

            modelBuilder.Entity<UserProject>()
                .HasOne(pt => pt.Project)
                .WithMany(t => t.UserProjects)
                .HasForeignKey(pt => pt.ProjectID);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Tasks)
                .WithOne(t => t.User);              


        }
    }
}
