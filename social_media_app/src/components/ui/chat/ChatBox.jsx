import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState, useRef } from "react";

import Avatar from "../../base/Avatar";

import { getMessage } from "../../../actions/chatAction";
import { hostURL } from "../../../api/index";

const ChatBox = ({ user, friend }) => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const test = async () => {
      const conn = new HubConnectionBuilder()
        .withUrl(`${hostURL}/Chat?userId=${user.id}`)
        .configureLogging(LogLevel.Information)
        .build();

      conn.on(
        "ReceiveMessage",
        (messageText, senderId, receiverId, timestamp) => {
          changeMessageList({ messageText, senderId, receiverId, timestamp });
        }
      );
      await conn.start();
      setConnection(conn);
    };

    test();
  }, [user.id]);

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
  }, [user.id, friend.id]);

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
    if (connection) {
      try {
        console.log(newMessage);
        await connection.invoke("SendMessage", user.id, friend.id, newMessage);
        changeMessageList({
          messageText: newMessage,
          senderId: user.id,
          receiverId: friend.id,
          timestamp: Date.now,
        });
        setNewMessage("");
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
              className={` bg-white max-w-[80%] px-3 py-2 m-2 rounded-3xl ${
                item.senderId === user.id
                  ? "self-end bg-blue-800 text-gray-50"
                  : "self-start"
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
