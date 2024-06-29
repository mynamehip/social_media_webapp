using social_media_be.Models.Post;

namespace social_media_be.Repositories.PostRepository
{
    public interface IPostRepository
    {
        Task<IEnumerable<PostModel>> GetAllPostsAsync(int pageNumber, int pageSize);
        Task<PostModel> GetPostByIdAsync(string id);
        public Task<bool> AddPostAsync(PostModel model);
    }
}
