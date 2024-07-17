using social_media_be.Models.Post;

namespace social_media_be.Repositories.PostRepository
{
    public interface IPostRepository
    {
        public Task<IEnumerable<PostModel>> GetAllPostsAsync(int pageNumber, int pageSize);
        public Task<PostModel> GetPostByIdAsync(string id);
        public Task<IEnumerable<PostModel>> GetPostByUserAsync(string userId, int pageNumber, int pageSize);
        public Task<bool> AddPostAsync(PostModel model);
        public Task DeletePostAsync(string postId);

        public Task VotePostAsync(VoteModel model);
        public Task UpdateVotePostAsync(VoteModel model);
        public Task DeleteVotePostAsync(string userid, string postId);
        public Task<(int upVote, int downVote)> GetAllVoteAsync(string postId);
        public Task<VoteModel> GetVoteByIdAsync(string userId, string postId);
    }
}
