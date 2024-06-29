using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using social_media_be.Entities;
using social_media_be.Helper;
using social_media_be.Models.Post;
using social_media_be.Repositories.PostRepository;

namespace social_media_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IPostRepository _repo;

        public PostController(AppDbContext context, IPostRepository repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpPost("CreatePost")]
        [Authorize(Roles = AppRoles.User)]
        public async Task<IActionResult> CreatePost([FromForm] PostModel model)
        {
            try
            {
                var result = await _repo.AddPostAsync(model);
                if (result)
                {
                    return StatusCode(StatusCodes.Status201Created);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllPost")]
        public async Task<IActionResult> GetAllPost(int pageNumber, int pageSize)
        {
            try
            {
                var posts = await _repo.GetAllPostsAsync(pageNumber, pageSize);
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
