import React, { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../components/base/Button";
import ChatBox from "../components/ui/chat/ChatBox";
import FollowingList from "../components/ui/chat/FollowingList";
import ChatHistories from "../components/ui/chat/ChatHistories";

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
    <div className=" w-full h-screen flex gap-5 p-5 bg-gray-900">
      <div className=" w-1/4 h-full flex flex-col gap-5">
        <div className="ml-5">
          <Button onClick={handleReturn}>Home</Button>
        </div>
        <ChatHistories
          user={user}
          handleClickUser={handleClickUser}
        ></ChatHistories>
      </div>
      <div className=" w-2/4 h-full bg-glass">
        {friend !== undefined ? (
          <ChatBox user={user} friend={friend}></ChatBox>
        ) : (
          <div className=" h-full text-2xl font-bold flex justify-center items-center">
            Choose one person
          </div>
        )}
      </div>
      <div className=" w-1/4 h-full">
        <FollowingList handleClickUser={handleClickUser}></FollowingList>
      </div>
    </div>
  );
};

export default memo(Chat);
