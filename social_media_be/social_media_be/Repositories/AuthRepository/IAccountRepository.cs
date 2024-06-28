using Microsoft.AspNetCore.Identity;
using social_media_be.Models.Auth;

namespace social_media_be.Repositories.AuthRepository
{
    public interface IAccountRepository
    {
        public Task<string> SignUpAsync(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);
    }
}
