using social_media_be.Entities;
using social_media_be.Models.User;

namespace social_media_be.Repositories.UserRepository
{
    public interface IUserRepository
    {
        public Task<UserModel> ChangeUserImage(string userId, string type, string imagePath);
        public Task<UserModel> GetByEmailAsync(string email);
        public Task<UserModel> GetByIdAsync(string id);
        public Task<IEnumerable<UserModel>> GetNewUsersAsync(int count);

        public Task<IEnumerable<UserModel>> GetFollowersAsync(string id);
        public Task<IEnumerable<UserModel>> GetFollowingAsync(string id);
        public Task FollowUserAsync(string followerId, string followingId);
        public Task UnfollowUserAsync(string followerId, string followingId);
    }
}
