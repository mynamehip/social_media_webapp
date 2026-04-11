import React from "react";

import Avatar from "../../base/Avatar";

const UserList = ({ userList, handleClick }) => {
  if (userList === undefined) userList = [];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {userList.map((item, index) => (
        <div
          key={index}
          className="relative group cursor-pointer"
          onClick={() => handleClick(item)}
          title={item.userName}
        >
          <div className="h-10 w-10 shrink-0 ring-2 ring-transparent group-hover:ring-primary-500 rounded-full transition-smooth overflow-hidden">
            <Avatar avatar={item.avatar} />
          </div>
          {/* Active status indicator */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-950 rounded-full"></div>
          
          {/* Tooltip-like name on hover for small sidebar */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-bold rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-smooth whitespace-nowrap z-50">
            {item.userName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
