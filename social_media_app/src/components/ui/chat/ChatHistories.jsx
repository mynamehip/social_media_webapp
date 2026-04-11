import React from "react";

import Avatar from "../../base/Avatar";
import { useChatContext } from "./ChatContext";

const ChatHistories = ({ handleClickUser, activeId }) => {
  const { unread, chats } = useChatContext();

  return (
    <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar">
      {chats?.map((item, index) => (
        <div
          key={index}
          className={`chat-history-item ${activeId === item.id ? "chat-history-item-active" : ""}`}
          onClick={() => handleClickUser(item.id)}
        >
          <div className="relative shrink-0">
            <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-100">
              <Avatar avatar={item.avatar} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <h4 className="text-sm font-bold text-gray-900 truncate">{item.userName}</h4>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 truncate max-w-[140px]">
                {unread.some((e) => e.senderId === item.id) ? "Sent a new message" : "Click to view chat"}
              </p>
              {unread.some((e) => e.senderId === item.id) && (
                <div className="h-2 w-2 rounded-full bg-primary-600 animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistories;
