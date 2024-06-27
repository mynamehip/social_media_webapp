using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace social_media_be.Entities
{
    public class Post
    {
        public string PostId { get; set; } = null!;
        public string Content { get; set; }
        public string Image { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; } = null!;
        public virtual User User { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }

    public class Comment
    {
        public string CommentId { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public string PostId { get; set; } = null!;
        public virtual Post Post { get; set; }

        public string UserId { get; set; } = null!;
        public virtual User User { get; set; }
    }

    public class Vote
    {
        public int VoteId { get; set; }
        public int Value { get; set; }
        
        public string PostId { get; set; } = null!;
        public virtual Post Post { get; set; }

        public string UserId { get; set; } = null!;
        public virtual User User { get; set; }
    }
}
