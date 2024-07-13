using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace social_media_be.Entities
{
    public class User : IdentityUser
    {
        public string? avatar {  get; set; } 
        public string? coverImage { get; set; }
        public string? connectionId { get; set; }
        public DateTime created_at { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }

        public virtual ICollection<Follow> Followers { get; set; }
        public virtual ICollection<Follow> Followings { get; set; }
    }

    public class Follow
    {
        public string FollowerId { get; set; } = null!;
        public virtual User Follower { get; set; }
        public string FollowingId { get; set; } = null!;
        public virtual User Following { get; set; }
        public DateTime FollowedAt { get; set; } = DateTime.UtcNow;
    }
}
