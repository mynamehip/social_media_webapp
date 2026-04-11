import React from "react";
import Avatar from "../../base/Avatar";

const ListRoom = ({ roomList, handleJoinDialog, setJoinRoomName }) => {
  const handleClick = (value) => {
    setJoinRoomName(value.key);
    handleJoinDialog();
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-6">
      {roomList.map((item, index) => (
        <div
          key={index}
          className="group relative bg-white border border-gray-100 rounded-[32px] p-6 shadow-md shadow-gray-200/50 hover:shadow-xl hover:border-red-100 transition-smooth cursor-pointer overflow-hidden flex flex-col justify-between aspect-square lg:aspect-auto lg:h-56"
          onClick={() => handleClick(item)}
        >
          {/* Room Header */}
          <div className="relative z-10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 w-fit px-3 py-1 rounded-full mb-2">Live Room</span>
            <div className="text-xl font-extrabold text-gray-900 leading-tight group-hover:text-red-600 transition-colors truncate">
              {item.key}
            </div>
          </div>

          {/* Room Body: Admin & Stats */}
          <div className="relative z-10 flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-white ring-2 ring-gray-50 overflow-hidden shadow-sm">
                <Avatar avatar={item.value.userList[0].avatar} />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold text-gray-900 leading-none mb-1">{item.value.userList[0].userName}</p>
                <p className="text-[10px] text-gray-400 font-medium">Room Admin</p>
              </div>
            </div>
            
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                {item.value.userList.length}+
              </div>
            </div>
          </div>

          {/* Decorative background circle */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gray-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50"></div>
        </div>
      ))}
    </div>
  );
};

export default ListRoom;
