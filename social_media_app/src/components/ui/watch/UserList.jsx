import React from "react";

import Avatar from "../../base/Avatar";

const UserList = ({ userList, handleClick }) => {
  if (userList === undefined) userList = [];

  return (
    <div className=" w-full h-full flex flex-col items-center overflow-y-scroll no-scrollbar">
      {userList.map((item, index) => (
        <div
          key={index}
          className=" flex flex-col items-center w-full py-2 hover:bg-[#ffffff60]"
          onClick={() => handleClick(item)}
        >
          <div className=" h-12 w-12">
            <Avatar avatar={item.avatar}></Avatar>
          </div>
          <div className=" text-white">{item.userName}</div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
