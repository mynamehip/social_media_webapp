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
                if (result.Succeeded)
                {
                    return Ok(result.Succeeded);
                }
                else
                {
                    throw new Exception(result.Errors.ToString());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
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
                    throw new Exception();
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
