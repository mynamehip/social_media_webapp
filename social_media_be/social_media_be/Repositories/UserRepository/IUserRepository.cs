using social_media_be.Models;

namespace social_media_be.Repositories.UserRepository
{
    public interface IUserRepository
    {
        public Task<UserModel> GetByEmailAsync(string email);
        public Task<UserModel> GetByIdAsync(string id);
    }
}
