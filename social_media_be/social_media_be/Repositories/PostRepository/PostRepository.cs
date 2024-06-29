using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
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
                if(model.Image != null && model.Image.Length > 0)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", model.Image.FileName);
                    using (var stream = File.Create(path))
                    {
                        await model.Image.CopyToAsync(stream);
                    }
                    imagePath = "/Images/" + model.Image.FileName; 
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
                    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imagePath.TrimStart('/'));
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
            var posts = await _context.Posts.OrderByDescending(p => p.CreatedAt).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            var postModels = _mapper.Map<List<PostModel>>(posts);
            for (int i = 0; i < posts.Count; i++)
            {
                var user = await _userRepo.GetByIdAsync(postModels[i].UserId);
                postModels[i].UserName = user.UserName;
                if (!string.IsNullOrEmpty(posts[i].Image))
                {
                    var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", posts[i].Image);
                    postModels[i].imagePath = imagePath;
                }
            }
            return postModels;
        }

        public Task<PostModel> GetPostByIdAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}
