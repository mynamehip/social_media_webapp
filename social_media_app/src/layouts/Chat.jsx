import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../components/base/Button";
import ChatBox from "../components/ui/chat/ChatBox";
import FollowingList from "../components/ui/chat/FollowingList";

import { getUser } from "../actions/userAction";

const Chat = () => {
  const [friend, setFriend] = useState();
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  const user = useSelector((state) => state.authReducer?.data?.user ?? null);

  const handleClickUser = async (id) => {
    const u = await getUser(id);
    setFriend(u.data);
  };

  return (
    <div className=" w-full h-screen flex gap-5 p-5 bg-dark-4">
      <div className=" w-1/4 h-full flex flex-col gap-5">
        <div className="ml-5">
          <Button onClick={handleReturn}>Home</Button>
        </div>
        <FollowingList
          user={user}
          handleClickUser={handleClickUser}
        ></FollowingList>
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
      <div className=" w-1/4 h-full bg-blue-500"></div>
    </div>
  );
};

export default Chat;
