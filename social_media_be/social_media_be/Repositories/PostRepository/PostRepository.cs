using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using social_media_be.Entities;
using social_media_be.Models.Post;

namespace social_media_be.Repositories.PostRepository
{
    public class PostRepository : IPostRepository
    {
        private AppDbContext _context;
        private IMapper _mapper;

        public PostRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

        public Task<IEnumerable<PostModel>> GetAllPostsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<PostModel> GetPostByIdAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}
