using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using social_media_be.Entities;
using social_media_be.Models.Post;
using social_media_be.Repositories.UserRepository;

namespace social_media_be.Repositories.PostRepository
{
    public class PostRepository : IPostRepository
    {
        private AppDbContext _context;
        private IMapper _mapper;
        private IUserRepository _userRepo;

        public PostRepository(AppDbContext context, IMapper mapper, IUserRepository userRepo)
        {
            _context = context;
            _mapper = mapper;
            _userRepo = userRepo;
        }

        public async Task<bool> AddPostAsync(PostModel model)
        {
            string imagePath = "";
            model.PostId = Guid.NewGuid().ToString();
            try
            {
                if (model.Image != null && model.Image.Length > 0)
                {
                    imagePath = "Post/" + model.Image.FileName;
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", imagePath);
                    using (var stream = File.Create(path))
                    {
                        await model.Image.CopyToAsync(stream);
                    }
                }
                var post = _mapper.Map<Post>(model);
                post.Image = imagePath;
                await _context.Posts.AddAsync(post);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                if (!string.IsNullOrEmpty(imagePath))
                {
                    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", imagePath);
                    if (File.Exists(fullPath))
                    {
                        File.Delete(fullPath);
                    }
                }
                throw new Exception(ex.Message.ToString());
            }
        }

        public async Task<IEnumerable<PostModel>> GetAllPostsAsync(int pageNumber, int pageSize)
        {
            IEnumerable<PostModel> result = await (from post in _context.Posts
                                                   join user in _context.Users on post.UserId equals user.Id
                                                   orderby post.CreatedAt descending
                                                   select new PostModel
                                                   {
                                                       PostId = post.PostId,
                                                       CreatedAt = post.CreatedAt,
                                                       Content = post.Content,
                                                       imagePath = post.Image,
                                                       UserName = user.UserName,
                                                       UserId = user.Id,
                                                       avatar = user.avatar,
                                                   }).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return result;
        }

        public Task<PostModel> GetPostByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task DeletePostAsync(string postId)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(p => p.PostId == postId);
            if (post != null)
            {
                if (!string.IsNullOrEmpty(post.Image))
                {
                    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", post.Image);
                    if (System.IO.File.Exists(fullPath))
                    {
                        System.IO.File.Delete(fullPath);
                    }
                }
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Error while delete. Please try later!");
            }
        }

        public async Task<IEnumerable<PostModel>> GetPostByUserAsync(string userId, int pageNumber, int pageSize)
        {
            IEnumerable<PostModel> result = await (from post in _context.Posts
                                                   join user in _context.Users on post.UserId equals user.Id
                                                   orderby post.CreatedAt descending
                                                   where user.Id == userId
                                                   select new PostModel
                                                   {
                                                       PostId = post.PostId,
                                                       CreatedAt = post.CreatedAt,
                                                       Content = post.Content,
                                                       imagePath = post.Image,
                                                       UserName = user.UserName,
                                                       UserId = user.Id,
                                                       avatar = user.avatar,
                                                   }).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return result;
        }

        public async Task VotePostAsync(VoteModel model)
        {
            try
            {
                var vote = _mapper.Map<Vote>(model);
                await _context.Votes.AddAsync(vote);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task UpdateVotePostAsync(VoteModel model)
        {
            try
            {
                var result = await _context.Votes.FirstOrDefaultAsync(p => p.UserId == model.UserId && p.PostId == model.PostId);
                if (result == null)
                {
                    throw new Exception("Can find the voted");
                }
                result.Value = model.Value;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task DeleteVotePostAsync(string userId, string postId)
        {
            try
            {
                var result = await _context.Votes.SingleOrDefaultAsync(p => p.UserId == userId && p.PostId == postId);
                if (result == null)
                {
                    throw new Exception("Can find the voted");
                }
                _context.Votes.Remove(result);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<(int upVote, int downVote)> GetAllVoteAsync(string postId)
        {
            try
            {
                var upVotes = await _context.Votes.CountAsync(v => v.PostId == postId && v.Value == 1);
                var downVotes = await _context.Votes.CountAsync(v => v.PostId == postId && v.Value == -1);

                return (upVotes, downVotes);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VoteModel> GetVoteByIdAsync(string userId, string postId)
        {
            try
            {
                var result = await _context.Votes.SingleOrDefaultAsync(p => p.UserId == userId && p.PostId == postId);

                if (result == null)
                {
                    return null;
                }
                var vote = _mapper.Map<VoteModel>(result);
                return vote;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
