using Microsoft.AspNetCore.Mvc;
using social_media_be.Models;
using social_media_be.Repositories;
using System.Reflection.Metadata.Ecma335;

namespace social_media_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private IAccountRepository accountRepo;

        public AuthController(IAccountRepository repo)
        {
            accountRepo = repo;
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
                return Ok(result);
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
                    return BadRequest("Sign-in failed. Please try again.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
