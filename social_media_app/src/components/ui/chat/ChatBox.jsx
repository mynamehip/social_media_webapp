import React, { useEffect, useState, useRef } from "react";
import Avatar from "../../base/Avatar";
import { IoIosSend } from "react-icons/io";
import { getMessage } from "../../../actions/chatAction";
import { useChatContext } from "./ChatContext";
import { formatChatTime } from "../../../utils/formatDate";

const ChatBox = ({ user, friend }) => {
  const [newMessage, setNewMessage] = useState("");

  const { messages, setMessages, connection } = useChatContext();

  const inputRef = useRef();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMessage(user.id, friend.id);
        setMessages(res.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    load();
    // eslint-disable-next-line
  }, [friend.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const changeMessageList = (value) => {
    setMessages((prevMessages) => {
      if (prevMessages !== null) {
        return [...prevMessages, value];
      } else {
        return [value];
      }
    });
  };

  const sendMessage = async () => {
    if (connection && newMessage.trim().length > 0) {
      try {
        const now = new Date().toISOString();
        await connection.invoke("SendMessage", user.id, friend.id, newMessage);
        changeMessageList({
          messageText: newMessage,
          senderId: user.id,
          receiverId: friend.id,
          timestamp: now,
        });
        setNewMessage("");
        inputRef.current.value = "";
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      {/* Chat Header */}
      {friend && (
        <div className="bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
              <Avatar avatar={friend.avatar} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">{friend.userName}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {messages &&
          messages.map((item, index) => {
            const isMe = item.senderId === user.id;
            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {!isMe && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 self-end mb-1">
                    <Avatar avatar={friend.avatar} />
                  </div>
                )}
                <div className="flex flex-col max-w-[70%]">
                  <div className={isMe ? "message-bubble-sender" : "message-bubble-receiver"}>
                    {item.messageText}
                  </div>
                  <span className={`text-[10px] text-gray-400 mt-1 px-1 ${isMe ? "text-right" : "text-left"}`}>
                    {formatChatTime(item.timestamp || item.time || item.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="p-6 bg-[#FAFAFA]">
        <div className="bg-white border border-gray-100 rounded-[24px] p-2 flex items-center shadow-sm focus-within:shadow-md focus-within:border-primary-200 transition-smooth">
          <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </button>
          <input
            className="flex-1 bg-transparent border-none outline-none px-3 text-sm font-medium text-gray-700 placeholder:text-gray-400"
            type="text"
            placeholder="Type your message..."
            ref={inputRef}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className={`p-2.5 rounded-full transition-smooth ${
              newMessage.trim().length > 0 
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20 active:scale-95" 
                : "text-gray-300 pointer-events-none"
            }`}
          >
            <IoIosSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
