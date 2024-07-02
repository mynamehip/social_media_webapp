using social_media_be.Models.Post;

namespace social_media_be.Models.User
{
    public class UserModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Avatar {  get; set; }
        public string Cover { get; set; }
    }
}
