import React, { useState } from "react";

import Button from "../../base/Button";

const MiniChatMenu = (props) => {
  const [smallChat, setSmallChat] = useState(false);
  const [smallFollowing, setSmallFollowing] = useState(false);

  return (
    <div className=" md:hidden flex justify-between sm:p-0 px-5 pt-5">
      <Button onClick={props.handleReturn}>Home</Button>
      <div className=" flex gap-2">
        <Button
          onClick={() => {
            setSmallChat((prev) => !prev);
            setSmallFollowing(false);
          }}
        >
          Chat
        </Button>
        <Button
          onClick={() => {
            setSmallChat(false);
            setSmallFollowing((prev) => !prev);
          }}
        >
          Following
        </Button>
      </div>
      {smallChat && (
        <div className=" absolute top-16 left-0 h-[80%] w-full bg-black z-10 mt-2">
          {props.chat}
        </div>
      )}
      {smallFollowing && (
        <div className=" absolute top-16 left-0 h-[80%] w-full bg-black z-10 mt-2">
          {props.following}
        </div>
      )}
    </div>
  );
};

export default MiniChatMenu;
