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
        public DbSet<Follow> Follows { get; set; }
        public DbSet<Message> Messages { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Post
            modelBuilder.Entity<Post>()
                .HasKey(p => p.PostId);

            // User - Post (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Posts)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Post - Comment (One-to-Many)
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // Comment
            modelBuilder.Entity<Comment>()
                .HasKey(c => c.CommentId);

            // User - Comment (One-to-Many)
            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Vote
            modelBuilder.Entity<Vote>()
                .HasKey(v => v.VoteId);

            // Post - Vote (One-to-Many)
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Votes)
                .WithOne(l => l.Post)
                .HasForeignKey(l => l.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            //Follow
            modelBuilder.Entity<Follow>()
            .HasKey(f => new { f.FollowerId, f.FollowingId });

            //Follow - User (Many-to-Many)
            modelBuilder.Entity<Follow>()
               .HasOne(f => f.Follower)
               .WithMany(u => u.Followings)
               .HasForeignKey(f => f.FollowerId)
               .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Follow>()
               .HasOne(f => f.Following)
               .WithMany(u => u.Followers)
               .HasForeignKey(f => f.FollowingId)
               .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
