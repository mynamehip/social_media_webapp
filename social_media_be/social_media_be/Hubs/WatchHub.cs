using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using social_media_be.Entities;
using social_media_be.Models.Chat;
using System;
using System.Collections.Concurrent;
using System.Text.RegularExpressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace social_media_be.Hubs
{
    public class WatchHub : Hub
    {
        public class VideoInfo
        {
            public string videoURL {  get; set; } = string.Empty;
            public bool playing { get; set; }
            public float currentTime { get; set; }

            public VideoInfo() { }

            public VideoInfo(string videoURL, bool playing, float currentTime)
            {
                this.videoURL = videoURL;
                this.playing = playing;
                this.currentTime = currentTime;
            }
        }

        public class UserInfo
        {
            public string userConnection { get; set; }
            public string userName { get; set; }
            public string avatar { get; set; }

            public UserInfo(string userConnection, string userName, string avatar)
            {
                this.userConnection = userConnection;
                this.userName = userName;
                this.avatar = avatar;
            }
        }

        public class RoomInfo
        {
            public string admin { get; set; } = string.Empty;
            public string password { get; set; } = string.Empty;
            public VideoInfo video { get; set; } = new VideoInfo();
            public List<UserInfo> userList { get; set; } = new List<UserInfo>();
        }
        private static ConcurrentDictionary<string, RoomInfo> connection = new ConcurrentDictionary<string, RoomInfo>();

        public override async Task OnConnectedAsync()
        {
            await Clients.Client(Context.ConnectionId).SendAsync("ReceiveRoomList", connection.ToList());
            await base.OnConnectedAsync();
        }

        public async Task CreateRoom( string roomName, string password, string userConnection, string userName, string avatar)
        {
            if (connection.ContainsKey(roomName))
            {
                throw new Exception("Room already exists!");
            }
            else
            {
                connection[roomName] = new RoomInfo();
                connection[roomName].admin = userConnection;
                connection[roomName].password = password;
                connection[roomName].userList.Add(new UserInfo(userConnection, userName, avatar));
            }
            await Groups.AddToGroupAsync(userConnection, roomName);
            await Clients.Group(roomName).SendAsync("ReceiveRoomMessage", "System", $"{userName} joined the room", DateTime.Now);
            await Clients.Group(roomName).SendAsync("ReceiveRoomUser", connection[roomName].admin, connection[roomName].userList);
            await Clients.All.SendAsync("ReceiveRoomList", connection.ToList());
        }

        public async Task JoinWatchRoom(string roomName, string password, string userConnection, string userName, string avatar)
        {
            if (connection.ContainsKey(roomName))
            {
                if (connection[roomName].password != password)
                {
                    throw new Exception("Wrong password!");
                }
                connection[roomName].userList.Add(new UserInfo(userConnection, userName, avatar));
                await Groups.AddToGroupAsync(userConnection, roomName);
                await Clients.Group(roomName).SendAsync("ReceiveRoomMessage", "System", $"{userName} joined the room", DateTime.Now);
                await Clients.Group(roomName).SendAsync("ReceiveRoomUser", connection[roomName].admin,  connection[roomName].userList);

            }
            else
            {
                throw new Exception("Room doesn't exist!");
            }
        }

        public async Task LeaveWatchRoom(string userConecction, string roomName)
        {
            if (connection.ContainsKey(roomName)){
                var user = connection[roomName].userList.Find(p => p.userConnection == userConecction);
                connection[roomName].userList.Remove(user);
                if (connection[roomName].userList.Count <= 0)
                {
                    connection.TryRemove(roomName, out _);
                }
                else
                {
                    if (connection[roomName].admin == userConecction)
                    {
                        connection[roomName].admin = connection[roomName].userList[0].userConnection;
                    }
                    await Clients.Group(roomName).SendAsync("ReceiveRoomUser", connection[roomName].admin, connection[roomName].userList);
                }
            }
            await Groups.RemoveFromGroupAsync(userConecction, roomName);
            await Clients.All.SendAsync("ReceiveRoomList", connection.ToList());
        }

        public async Task KickUser(string userConnection, string roomName)
        {
            await LeaveWatchRoom(userConnection, roomName);
            await Clients.Client(userConnection).SendAsync("ReceiveKickMessage", $"You had been kicked out of \"{roomName}\"");
        }

        public async Task SendRoomMessage(string userName, string messageText, string roomName)
        {
            await Clients.Group(roomName).SendAsync("ReceiveRoomMessage", userName, messageText, DateTime.Now);
        }

        public async Task SendVieoState(string userConnection, string roomName, VideoInfo model)
        {
            if (connection.ContainsKey(roomName))
            {
                connection[roomName].video = model;
            }
            if(userConnection == null)
            {
                await Clients.Group(roomName).SendAsync("ReceiveRoomVideo", connection[roomName].video);
            }
            else
            {
                await Clients.Client(userConnection).SendAsync("ReceiveRoomVideo", connection[roomName].video);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            foreach (var roomName in connection.Keys)
            {
                var user = connection[roomName].userList.Find(p => p.userConnection == Context.ConnectionId);
                if (user != null)
                {
                    await LeaveWatchRoom(roomName, Context.ConnectionId);
                    break;
                }
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}
