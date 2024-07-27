import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { IoIosSend } from "react-icons/io";

const ChatBox = ({ messages, connection, roomName }) => {
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef();
  const messagesEndRef = useRef();

  if (messages === undefined) messages = [];

  const user = useSelector((state) => {
    return state.authReducer?.data?.user ?? null;
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (connection && newMessage.trim().length > 0) {
      try {
        await connection.invoke("SendRoomMessage", user.userName, newMessage, roomName);
        setNewMessage("");
        inputRef.current.value = "";
      } catch (error) {
        console.error("Sending message failed: ", error);
      }
    }
  };

  return (
    <div className="w-full h-full bg-slate-700">
      <div className=" w-full h-[85%] overflow-y-scroll no-scrollbar">
        {messages.map((item, index) => (
          <div
            key={index}
            className={` flex ${
              item.userName === user.userName ? "justify-end text-base" : "justify-start text-base"
            } 
              ${item.userName === "System" ? "justify-center text-sm" : ""}`}
          >
            <div className=" flex flex-col px-2 my-2 max-w-[80%]">
              {item.userName !== "System" && (
                <div
                  className={` font-semibold text-white ${
                    item.userName === user.userName ? " text-end" : ""
                  }`}
                >
                  {item.userName}
                </div>
              )}
              <div
                className={` flex ${
                  item.userName === user.userName
                    ? " bg-slate-800 text-white px-3 py-2 rounded-2xl"
                    : "bg-black text-white px-3 py-2 rounded-2xl"
                } 
              ${
                item.userName === "System" ? " bg-transparent text-gray-400 italic text-center" : ""
              }`}
              >
                {item.messageText}
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className=" w-full p-4 flex justify-between gap-4 ">
          <input
            className=" flex-1 rounded-full h-10 px-4"
            type="text"
            ref={inputRef}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className=" bg-[#0575E6] h-10 w-10 rounded-full text-2xl flex justify-center items-center"
          >
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
