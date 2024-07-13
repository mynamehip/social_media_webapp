import React, { useState } from "react";

const WaittingRoom = ({ joinChatRoom }) => {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    joinChatRoom(userId, userName, chatRoom);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}></form>
    </div>
  );
};

export default WaittingRoom;
