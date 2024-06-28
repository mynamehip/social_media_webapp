using Microsoft.AspNetCore.Http;
using social_media_be.Entities;

namespace social_media_be.Models.Post
{
    public class PostModel
    {
        public string? PostId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; } = null!;

        public IFormFile? Image { get; set; }
    }
}
