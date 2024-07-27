import React from "react";
import Avatar from "../../base/Avatar";

const ListRoom = ({ roomList, handleJoinDialog, setJoinRoomName }) => {
  const handleClick = (value) => {
    setJoinRoomName(value.key);
    handleJoinDialog();
  };

  return (
    <div className=" w-full h-full overflow-y-scroll grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 pt-5 px-5">
      {roomList.map((item, index) => (
        <div
          key={index}
          className=" h-32 bg-green-500 rounded-md"
          onClick={() => handleClick(item)}
        >
          <div className=" text-white font-semibold text-2xl px-2 mt-3 mb-1 w-full overflow-hidden">
            {item.key}
          </div>
          <div className=" w-full overflow-hidden flex items-center gap-3 px-2">
            <div className=" h-10 w-10">
              <Avatar avatar={item.value.userList[0].avatar}></Avatar>
            </div>
            <div className=" text-lg text-white font-medium">{item.value.userList[0].userName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListRoom;
