using social_media_be.Models.User;

namespace social_media_be.Models.Post
{
    public class CommentModel
    {
            public int CommentId { get; set; }
            public string Content { get; set; }
            public DateTime CreatedAt { get; set; }
            public int PostId { get; set; }
            public PostModel Post { get; set; }
            public string UserId { get; set; }
            public UserModel User { get; set; }
    }
}
