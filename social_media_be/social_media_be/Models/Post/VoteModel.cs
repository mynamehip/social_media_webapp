namespace social_media_be.Models.Post
{
    public class VoteModel
    {
        public int VoteId { get; set; }
        public int Value { get; set; }
        public int PostId { get; set; }
        public PostModel Post { get; set; }
        public string UserId { get; set; }
        public UserModel User { get; set; }
    }
}
