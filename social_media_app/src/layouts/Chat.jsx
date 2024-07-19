import React, { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../components/base/Button";
import ChatBox from "../components/ui/chat/ChatBox";
import FollowingList from "../components/ui/chat/FollowingList";
import ChatHistories from "../components/ui/chat/ChatHistories";
import MiniChatMenu from "../components/ui/chat/MiniChatMenu";

import { getUser } from "../actions/userAction";
import { useChatContext } from "../components/ui/chat/ChatContext";
import { getChatHistory } from "../actions/chatAction";

const Chat = () => {
  const [friend, setFriend] = useState();
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  const user = useSelector((state) => state.authReducer?.data?.user ?? null);

  const { setHasNewMessages, connection, setUnread, setChats } =
    useChatContext();

  useEffect(() => {
    const load = async () => {
      setHasNewMessages(false);
      const r = await getChatHistory(user?.id);
      setChats(r.data);
    };
    load();
    // eslint-disable-next-line
  }, []);

  const handleClickUser = async (id) => {
    const u = await getUser(id);
    connection.invoke("ReadedMessage", id, user.id);
    setUnread((prev) => {
      return prev.filter((e) => e.senderId !== id);
    });
    setFriend(u.data);
  };

  return (
    <div className=" w-full h-screen flex sm:flex-row flex-col gap-5 sm:p-5 bg-gray-900">
      <MiniChatMenu
        chat={
          <ChatHistories
            user={user}
            handleClickUser={handleClickUser}
          ></ChatHistories>
        }
        following={
          <FollowingList handleClickUser={handleClickUser}></FollowingList>
        }
        handleReturn={handleReturn}
      ></MiniChatMenu>
      <div className=" hidden md:flex md:w-2/5 lg:w-1/4 h-full flex-col gap-5 overflow-hidden">
        <div className=" flex justify-between">
          <Button onClick={handleReturn}>Home</Button>
        </div>
        <div className=" md:h-1/2">
          <ChatHistories
            user={user}
            handleClickUser={handleClickUser}
          ></ChatHistories>
        </div>
        <div className=" block md:h-1/2 lg:hidden">
          <FollowingList handleClickUser={handleClickUser}></FollowingList>
        </div>
      </div>
      <div className=" w-full md:w-3/5 lg:w-2/4 h-full bg-glass">
        {friend !== undefined ? (
          <ChatBox user={user} friend={friend}></ChatBox>
        ) : (
          <div className=" h-full text-2xl font-bold flex justify-center items-center">
            Choose one person
          </div>
        )}
      </div>
      <div className=" lg:block hidden w-1/4 h-full">
        <FollowingList handleClickUser={handleClickUser}></FollowingList>
      </div>
    </div>
  );
};

export default memo(Chat);
