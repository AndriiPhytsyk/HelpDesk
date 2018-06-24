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
                .HasForeignKey(pt => pt.UserID)
                .OnDelete(DeleteBehavior.Restrict); 


            modelBuilder.Entity<UserProject>()
                .HasOne(pt => pt.Project)
                .WithMany(t => t.UserProjects)
                .HasForeignKey(pt => pt.ProjectID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Tasks)
                .WithOne(t => t.User);

            modelBuilder.Entity<Organization>()
                .HasMany(c => c.Projects)
                .WithOne(e => e.CurrentOrganization);


            modelBuilder.Entity<Organization>()
                .HasMany(c => c.Users)
                .WithOne(e => e.CurrentOrganization);



            modelBuilder.Entity<Project>()
                .HasMany(c => c.Tasks)
                .WithOne(e => e.CurrentProject);
                



        }
    }
}
