using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using social_media_be.Entities;
using social_media_be.Models.Chat;
using System.Diagnostics.Eventing.Reader;
using Microsoft.EntityFrameworkCore;

public class ChatHub : Hub
{
    private readonly AppDbContext _context;

    public ChatHub(AppDbContext context)
    {
        _context = context;
    }

    public async Task SendMessage(string senderId, string receiverId, string messageText)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == receiverId);
        var connectionId = user?.connectionId;

        var newMessage = new Message
        {
            SenderId = senderId,
            ReceiverId = receiverId,
            MessageText = messageText,
            Timestamp = DateTime.Now,
            isReaded = false,
        };
        await _context.Messages.AddAsync(newMessage);
        await _context.SaveChangesAsync();

        if (!string.IsNullOrEmpty(connectionId))
        {
            await Clients.Client(connectionId).SendAsync("ReceiveMessage", messageText, senderId, receiverId, DateTime.Now);
        }
    }

    public async Task ReadedMessage(string senderId, string receiverId)
    {
        var messagesToUpdate = await _context.Messages
            .Where(m => m.ReceiverId == receiverId && m.SenderId == senderId)
            .ToListAsync();
        foreach (var message in messagesToUpdate)
        {
            message.isReaded = true;
        }

        await _context.SaveChangesAsync();
    }

    public override async Task OnConnectedAsync()
    {
        string userId = Context.GetHttpContext().Request.Query["userId"].ToString();
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        if (user != null)
        {
            user.connectionId = Context.ConnectionId;
            await _context.SaveChangesAsync();
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
