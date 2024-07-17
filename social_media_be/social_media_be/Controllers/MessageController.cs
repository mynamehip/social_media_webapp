using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using social_media_be.Entities;
using System.Threading;

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

        [HttpGet("UnReadMessage")]
        public async Task<IActionResult> GetUnReadMessage(string userId)
        {
            var unread = await _context.Messages
                .Where(m => m.ReceiverId == userId && m.isReaded == false)
                .GroupBy(m => m.SenderId)
                .Select(g => g.Select( m => new
                {
                    m.MessageText,
                    m.SenderId,
                    m.ReceiverId,
                    m.Timestamp
                }).FirstOrDefault()).ToListAsync();
            return Ok(unread);
        }

        [HttpGet("ChatHistory")]
        public async Task<IActionResult> GetChatHistory(string userId)
        {
            var list1 = await (from m in _context.Messages
                              join u in _context.Users on m.ReceiverId equals u.Id
                              where m.SenderId == userId
                              orderby m.Timestamp descending
                              select new
                              {
                                  id = m.ReceiverId,
                                  avatar = u.avatar,
                                  userName = u.UserName,
                              }).Distinct().ToListAsync();
            var list2 = await (from m in _context.Messages
                               join u in _context.Users on m.SenderId equals u.Id
                               where m.ReceiverId == userId
                               orderby m.Timestamp descending
                               select new
                               {
                                   id = m.SenderId,
                                   avatar = u.avatar,
                                   userName = u.UserName,
                               }).Distinct().ToListAsync();


            var chatList = list1.Union(list2).ToList();
            return Ok(chatList);
        }
    }
}
