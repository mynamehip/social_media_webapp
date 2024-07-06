using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using social_media_be.Entities;
using social_media_be.Helper;
using social_media_be.Models.User;

namespace social_media_be.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;
        private RoleManager<IdentityRole> roleManager;
        private IMapper mapper;
        private AppDbContext _context;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, IMapper mapper, AppDbContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.mapper = mapper;
            _context = context;
        }

        public async Task<UserModel> ChangeUserImage(string userId, string type, string imagePath)
        {
            try
            {
                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    throw new Exception("User not found");
                }
                if(type.ToLower() == "avatar")
                {
                    user.avatar = imagePath;
                }
                else if(type.ToLower() == "cover")
                {
                    user.coverImage = imagePath;
                }
                else
                {
                    throw new Exception("Invalid image type. Allowed values are 'avatar' or 'cover'");
                }
                await _context.SaveChangesAsync();
                return mapper.Map<UserModel>(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<UserModel> GetByEmailAsync(string email)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(email);
                return mapper.Map<UserModel>(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<UserModel> GetByIdAsync(string id)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);
                return mapper.Map<UserModel>(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UserModel>> GetNewUsersAsync(int count)
        {
            try
            {
                var userList = await _context.Users.OrderByDescending(u => u.created_at).Take(count).ToListAsync();
                return mapper.Map<List<UserModel>>(userList);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UserModel>> GetFollowersAsync(string id)
        {
            try
            {
                var userList = await _context.Follows.Where(f => f.FollowingId == id).Select(f => f.Follower).ToListAsync();
                return mapper.Map<List<UserModel>>(userList);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UserModel>> GetFollowingAsync(string id)
        {
            try
            {
                var userList = await _context.Follows.Where(f => f.FollowerId == id).Select(f => f.Following).ToListAsync();
                return mapper.Map<List<UserModel>>(userList);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task FollowUserAsync(string followerId, string followingId)
        {
            try
            {
                var follow = new Follow
                {
                    FollowerId = followerId,
                    FollowingId = followingId
                };
                _context.Follows.Add(follow);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task UnfollowUserAsync(string followerId, string followingId)
        {
            try
            {
                var follow = await _context.Follows.FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FollowingId == followingId);
                if (follow != null)
                {
                    _context.Follows.Remove(follow);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
