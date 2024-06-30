namespace social_media_be.Models.Post
{
    public class VoteModel
    {
        public int Value { get; set; }
        public string PostId { get; set; }
        public string UserId { get; set; }
    }
}
