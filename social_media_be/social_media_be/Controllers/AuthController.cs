using Microsoft.AspNetCore.Mvc;
using social_media_be.Models.Auth;
using social_media_be.Repositories.AuthRepository;
using social_media_be.Repositories.UserRepository;
using System.Reflection.Metadata.Ecma335;

namespace social_media_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAccountRepository accountRepo;
        private IUserRepository userRepo;

        public AuthController(IAccountRepository repo, IUserRepository userRepository)
        {
            accountRepo = repo;
            userRepo = userRepository;
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpModel model)
        {
            try
            {
                var result = await accountRepo.SignUpAsync(model);
                if (string.IsNullOrEmpty(result))
                {
                    return BadRequest("Sign-up failed. Please try again.");
                }
                var user = await userRepo.GetByEmailAsync(model.Email);
                return Ok(new { result, user });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInModel model)
        {
            try
            {
                var result = await accountRepo.SignInAsync(model);
                if (string.IsNullOrEmpty(result))
                {
                    return BadRequest("Sign-up failed. Please try again.");
                }
                var user = await userRepo.GetByEmailAsync(model.Email);
                return Ok(new { result, user });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
