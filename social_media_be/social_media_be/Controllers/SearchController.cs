using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using social_media_be.Entities;
using social_media_be.Helper;
using social_media_be.Models.User;

namespace social_media_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public SearchController(AppDbContext context, UserManager<User> userManager, IMapper mapper) {
            _context = context;
            _userManager = userManager;
            _mapper =mapper;
        }

        [HttpGet("SearchUser")]
        public async Task<IActionResult> SearchUserByName (string userName)
        {
            try
            {
                var user = await _userManager.Users.Where(p => p.UserName.Contains(userName)).ToListAsync();
                if(user.Count == 0)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(_mapper.Map<List<UserModel>>(user));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
