namespace social_media_be.Models.User
{
    public class UserImage
    {
        public string userId { get; set; }
        public string type { get; set; }
        public IFormFile image { get; set; }
    }
}
