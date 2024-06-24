using Microsoft.AspNetCore.Identity;
using social_media_be.Models;

namespace social_media_be.Repositories
{
    public interface IAccountRepository
    {
        public Task<string> SignUpAsync(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);
    }
}
