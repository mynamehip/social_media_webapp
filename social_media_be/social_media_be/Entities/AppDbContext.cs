using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace social_media_be.Entities
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        #region DbSet
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Vote> Votes { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Post (primary key assumed to be Id)
            modelBuilder.Entity<Post>()
                .HasKey(p => p.PostId);

            // User - Post (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Posts)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction); // Consider NoAction

            // Post - Comment (One-to-Many)
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.NoAction); // Consider NoAction

            // Comment (primary key assumed to be Id)
            modelBuilder.Entity<Comment>()
                .HasKey(c => c.CommentId);

            // User - Comment (One-to-Many) - Adjust if not needed
            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments) // Adjust if not needed
                .WithOne(c => c.User) // Adjust if not needed
                .HasForeignKey(c => c.UserId) // Adjust if not needed
                .OnDelete(DeleteBehavior.NoAction); // Consider NoAction (Adjust if needed)

            // Vote (primary key assumed to be Id)
            modelBuilder.Entity<Vote>()
                .HasKey(v => v.VoteId);

            // Post - Like (One-to-Many)
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Votes)
                .WithOne(l => l.Post)
                .HasForeignKey(l => l.PostId)
                .OnDelete(DeleteBehavior.NoAction); // Consider NoAction
        }
    }
}
