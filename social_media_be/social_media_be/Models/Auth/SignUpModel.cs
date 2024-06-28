using System.ComponentModel.DataAnnotations;

namespace social_media_be.Models.Auth
{
    public class SignUpModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
