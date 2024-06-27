using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace social_media_be.Entities
{
    public class User : IdentityUser
    {
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
