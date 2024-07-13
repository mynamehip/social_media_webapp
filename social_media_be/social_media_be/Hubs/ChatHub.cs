using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using social_media_be.Entities;
using social_media_be.Models.Chat;
using System.Diagnostics.Eventing.Reader;

public class ChatHub : Hub
{
    private readonly AppDbContext _context;

    public ChatHub(AppDbContext context)
    {
        _context = context;
    }

    public async Task SendMessage(string senderId, string receiverId, string messageText)
    {
        var connectionId = _context.Users.FirstOrDefault(u => u.Id == receiverId)?.connectionId;

        var newMessage = new Message
        {
            SenderId = senderId,
            ReceiverId = receiverId,
            MessageText = messageText,
            Timestamp = DateTime.Now
        };
        _context.Messages.Add(newMessage);
        await _context.SaveChangesAsync();

        if (!string.IsNullOrEmpty(connectionId))
        {
            await Clients.Client(connectionId).SendAsync("ReceiveMessage", messageText, senderId, receiverId, DateTime.Now);
        }
        
    }

    public override async Task OnConnectedAsync()
    {
        string userId = Context.GetHttpContext().Request.Query["userId"].ToString();
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        if (user != null)
        {
            user.connectionId = Context.ConnectionId;
            await _context.SaveChangesAsync();

            // Gửi tin nhắn chưa đọc
            //var unreadMessages = _context.Messages.Where(m => m.ReceiverId == userId && !m.IsRead).ToList();
            //foreach (var message in unreadMessages)
            //{
            //    await Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", message.SenderId, message.MessageText);
            //    message.IsRead = true;
            //}
            //await _context.SaveChangesAsync();
        }
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var user = _context.Users.FirstOrDefault(u => u.connectionId == Context.ConnectionId);
        if (user != null)
        {
            user.connectionId = null;
            await _context.SaveChangesAsync();
        }
        await base.OnDisconnectedAsync(exception);
    }

}
