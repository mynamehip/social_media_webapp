using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using social_media_be.Entities;
using social_media_be.Helper;
using social_media_be.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace social_media_be.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;
        private IConfiguration configuration;
        private RoleManager<IdentityRole> roleManager;

        public AccountRepository(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
        }

        public async Task<string> SignInAsync(SignInModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);
            if(user == null || passwordValid == false)
            {
                return string.Empty;
            }
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var userRole = await userManager.GetRolesAsync(user);
            foreach (var role in userRole)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }
            var authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(20),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authKey, SecurityAlgorithms.HmacSha512Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IdentityResult> SignUpAsync(SignUpModel model)
        {
            var user = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
            };
            var result = await userManager.CreateAsync(user, model.Password);  
            if (result.Succeeded)
            {
                if(!await roleManager.RoleExistsAsync(AppRoles.User))
                {
                    await roleManager.CreateAsync(new IdentityRole(AppRoles.User));
                }

                await userManager.AddToRoleAsync(user, AppRoles.User);
            }

            return result;
        }
    }
}
