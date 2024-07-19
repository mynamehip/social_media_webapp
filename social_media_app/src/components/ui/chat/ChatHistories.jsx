import React from "react";

import Avatar from "../../base/Avatar";
import { useChatContext } from "./ChatContext";

const ChatHistories = ({ handleClickUser }) => {
  const { unread, chats } = useChatContext();

  return (
    <div className=" flex flex-col gap-3 pb-2 overflow-y-scroll no-scrollbar">
      {chats?.map((item, index) => (
        <div
          key={index}
          className=" flex gap-4 items-center bg-white p-2 rounded-xl"
          onClick={() => handleClickUser(item.id)}
        >
          <div className=" h-12 w-12">
            <Avatar avatar={item.avatar}></Avatar>
          </div>
          <div>
            <div className=" text-base font-semibold">{item.userName}</div>
            {unread.some((e) => e.senderId === item.id) ? (
              <div className=" h-3 w-3 rounded-full bg-red-500"></div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistories;
