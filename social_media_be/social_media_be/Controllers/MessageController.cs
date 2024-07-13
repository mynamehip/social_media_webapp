using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using social_media_be.Entities;

namespace social_media_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessageController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetMessage")]
        public async Task<IActionResult> GetMessages(string userId, string friendId)
        {
            var messages = await _context.Messages
                .Where(m => (m.SenderId == userId && m.ReceiverId == friendId) ||
                            (m.SenderId == friendId && m.ReceiverId == userId))
                .OrderBy(m => m.Timestamp)
                .Select(m => new { m.MessageText, m.SenderId, m.ReceiverId, m.Timestamp})
                .ToListAsync();
            return Ok(messages);
        }
    }
}
