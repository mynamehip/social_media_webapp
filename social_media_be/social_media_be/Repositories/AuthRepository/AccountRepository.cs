using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using social_media_be.Entities;
using social_media_be.Helper;
using social_media_be.Models.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace social_media_be.Repositories.AuthRepository
{
    public class AccountRepository : IAccountRepository
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;
        private IConfiguration configuration;
        private RoleManager<IdentityRole> roleManager;
        private readonly IHttpClientFactory _clientFactory;

        public AccountRepository(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, IHttpClientFactory clientFactory)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
            this._clientFactory = clientFactory;
        }

        private const string ZeroBounceApiKey = "bed9313acd5545ce896a1d256ed7e465";

        public async Task<string> SignInAsync(SignInModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);
            if (user == null)
            {
                throw new Exception("Account not found");
            }
            if (passwordValid == false)
            {
                throw new Exception("Incorrect password");
            }
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var userRole = await userManager.GetRolesAsync(user);
            foreach (var role in userRole)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
            }
            return CreateToken(user, authClaims);
        }

        public async Task<string> SignUpAsync(SignUpModel model)
        {
            var existingUser = await userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                throw new Exception("Email already in used!");
            }
            var checkEmailExist = await CheckEmailExist(model.Email);
            if (checkEmailExist == false)
            {
                throw new Exception("Email not exist");
            }
            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                throw new Exception($"Errors: {errors}");
            }
            if (!await roleManager.RoleExistsAsync(AppRoles.User))
            {
                await roleManager.CreateAsync(new IdentityRole(AppRoles.User));
            }
            await userManager.AddToRoleAsync(user, AppRoles.User);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var userRoles = await userManager.GetRolesAsync(user);
            authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role.ToString())));
            return CreateToken(user, authClaims);
        }
        public string CreateToken(User user, List<Claim> authClaims)
        {
            var authKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(30),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authKey, SecurityAlgorithms.HmacSha512Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public class ZeroBounceVerificationResponse
        {
            public string Status { get; set; }
        }

        public async Task<bool> CheckEmailExist(string email)
        {
            var apiUrl = $"https://api.zerobounce.net/v2/validate?email={email}&api_key={ZeroBounceApiKey}";
            try
            {
                var client = _clientFactory.CreateClient();
                var response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var verificationResult = JsonConvert.DeserializeObject<ZeroBounceVerificationResponse>(content);

                    if (verificationResult.Status == "valid")
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
