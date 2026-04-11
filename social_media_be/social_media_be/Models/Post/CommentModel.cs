namespace social_media_be.Models.Post
{
    public class CommentModel
    {
        public string? CommentId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string PostId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string? UserName { get; set; }
        public string? Avatar { get; set; }
    }
}
