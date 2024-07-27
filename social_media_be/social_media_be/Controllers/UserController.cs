using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using social_media_be.Entities;
using social_media_be.Helper;
using social_media_be.Models.User;
using social_media_be.Repositories.PostRepository;
using social_media_be.Repositories.UserRepository;
using static System.Net.Mime.MediaTypeNames;

namespace social_media_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IPostRepository _postRepository;

        public UserController(IUserRepository userRepository, IPostRepository postRepository)
        {
            _userRepository = userRepository;
            _postRepository = postRepository;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            try
            {
                var user = await _userRepository.GetByIdAsync(userId);
                if (user == null)
                {
                    return NotFound("User not found.");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ChangeUserImage")]
        [Authorize(Roles = AppRoles.User)]
        public async Task<IActionResult> ChangeUserImage([FromForm] UserImage model)
        {
            try
            {
                string imagePath = "";
                if (model.image != null && model.image.Length > 0)
                {
                    imagePath = "Profile/" + model.image.FileName;
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", imagePath);
                    using (var stream = System.IO.File.Create(path))
                    {
                        await model.image.CopyToAsync(stream);
                    }
                }
                if(model.oldImage != null && model.oldImage.Length > 0)
                {
                    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", model.oldImage);
                    if (System.IO.File.Exists(fullPath))
                    {
                        System.IO.File.Delete(fullPath);
                    }
                }
                var res = await _userRepository.ChangeUserImage(model.userId, model.type, imagePath);
                return StatusCode(StatusCodes.Status200OK, res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to update user image: {ex.Message}");
            }
        }

        [HttpGet("GetNewUsers")]
        public async Task<IActionResult> GetNewUsers(int count = 10)
        {
            try
            {
                var newUsers = await _userRepository.GetNewUsersAsync(count);
                return Ok(newUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllFollower")]
        public async Task<IActionResult> GetFollowers(string userId)
        {
            try
            {
                var followers = await _userRepository.GetFollowersAsync(userId);
                if (!followers.Any())
                {
                    return StatusCode(StatusCodes.Status204NoContent, "This user has no following");
                }
                return Ok(followers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllFollowing")]
        public async Task<IActionResult> GetFollowing(string userId)
        {
            try
            {
                var following = await _userRepository.GetFollowingAsync(userId);
                if (!following.Any())
                {
                    return StatusCode(StatusCodes.Status204NoContent, "This user has no followers");
                }
                return Ok(following);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FollowUser")]
        [Authorize(Roles = AppRoles.User)]
        public async Task<IActionResult> FollowUser(string followerId, string followingId)
        {
            try
            {
                if (followerId == followingId)
                {
                    throw new Exception("Cannot follow yourself");
                }
                await _userRepository.FollowUserAsync(followerId, followingId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("UnfollowUser")]
        [Authorize(Roles = AppRoles.User)]
        public async Task<IActionResult> Unfollow(string followerId, string followingId)
        {
            try
            {
                await _userRepository.UnfollowUserAsync(followerId, followingId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetUserActivities")]
        public async Task<IActionResult> GetUserActivities(string userId)
        {
            try
            {
                var follower = await _userRepository.GetFollowersAsync(userId);
                var following = await _userRepository.GetFollowingAsync(userId);
                var postNumber = await _postRepository.GetPostByUserAsync(userId, 1, 10000);
                var result = new
                {
                    follower = follower.Count(),
                    following = following.Count(),
                    postNumber = postNumber.Count()
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
