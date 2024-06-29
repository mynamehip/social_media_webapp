using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting;
using social_media_be.Entities;
using social_media_be.Helper;
using social_media_be.Models;

namespace social_media_be.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;
        private RoleManager<IdentityRole> roleManager;
        private IMapper mapper;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.mapper = mapper;
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
    }
}
