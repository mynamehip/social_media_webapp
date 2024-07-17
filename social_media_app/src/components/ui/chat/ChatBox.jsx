import React, { useEffect, useState, useRef } from "react";

import Avatar from "../../base/Avatar";

import { getMessage } from "../../../actions/chatAction";
import { useChatContext } from "./ChatContext";

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
        await connection.invoke("SendMessage", user.id, friend.id, newMessage);
        changeMessageList({
          messageText: newMessage,
          senderId: user.id,
          receiverId: friend.id,
          timestamp: Date.now,
        });
        setNewMessage("");
        inputRef.current.value = "";
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return (
    <div className=" flex flex-col h-full">
      {friend && (
        <div className=" bg-white mb-1 flex items-center gap-2 p-2 rounded-t-xl">
          <div className=" w-10 h-10">
            <Avatar avatar={friend.avatar}></Avatar>
          </div>
          <div className=" font-bold">{friend.userName}</div>
        </div>
      )}
      <div className=" flex-1 flex flex-col overflow-y-scroll">
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={` max-w-[80%] px-3 py-2 m-2 rounded-3xl ${
                item.senderId === user.id
                  ? "self-end bg-blue-800 text-white"
                  : "self-start bg-white"
              }`}
            >
              {item.messageText}
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div className=" w-full p-4 flex justify-between gap-4 ">
        <input
          className=" flex-1 rounded-full h-10 px-4"
          type="text"
          ref={inputRef}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className=" bg-[#0575E6] h-10 px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
