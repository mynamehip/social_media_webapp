import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchContext } from "./WatchContext";
import { TbLock, TbLockOpen, TbX } from "react-icons/tb";

const CreateRoomDialog = (props) => {
  const { connection, setRoomMessages, setRoomName, user } = useWatchContext();

  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    password: "",
    userConnection: connection.connectionId,
    userName: user.userName,
    avatar: user.avatar,
    roomType: false, // public by default
  });

  const navigate = useNavigate();
  const handleCreateRoom = async () => {
    if (!roomInfo.roomName.trim()) return;
    try {
      setRoomMessages([]);
      setRoomName(roomInfo.roomName);
      await connection.invoke(
        "CreateRoom",
        roomInfo.roomName,
        roomInfo.password,
        roomInfo.userConnection,
        roomInfo.userName,
        roomInfo.avatar
      );
      navigate(`/watch/${roomInfo.roomName}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-black/20 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="relative p-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create Room</h2>
            <p className="text-sm text-gray-500 font-medium">Set up your private cinema session</p>
          </div>
          <button 
            onClick={props.handleCreateDialog} 
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-smooth"
          >
            <TbX size={20} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Room Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Room Title</label>
            <input
              type="text"
              placeholder="e.g. Movie Night with Friends"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium text-gray-900"
              onChange={(e) => setRoomInfo((prev) => ({ ...prev, roomName: e.target.value }))}
            />
          </div>

          {/* Access Type (Radio tiles) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Privacy Level</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRoomInfo((prev) => ({ ...prev, roomType: false }))}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-smooth ${
                  !roomInfo.roomType 
                  ? "border-primary-600 bg-primary-50/30 text-primary-600" 
                  : "border-gray-100 text-gray-400"
                }`}
              >
                <TbLockOpen size={20} />
                <span className="font-bold text-sm">Public</span>
              </button>
              <button
                onClick={() => setRoomInfo((prev) => ({ ...prev, roomType: true }))}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-smooth ${
                  roomInfo.roomType 
                  ? "border-primary-600 bg-primary-50/30 text-primary-600" 
                  : "border-gray-100 text-gray-400"
                }`}
              >
                <TbLock size={20} />
                <span className="font-bold text-sm">Private</span>
              </button>
            </div>
          </div>

          {/* Password Input (conditional) */}
          {roomInfo.roomType && (
            <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Room Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium text-gray-900"
                onChange={(e) => setRoomInfo((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
          )}
        </div>

        <div className="p-8 pt-0 mt-4">
          <button
            className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-lg shadow-primary-600/20 active:scale-95 transition-smooth"
            onClick={handleCreateRoom}
          >
            Launch Experience
          </button>
          <button 
            onClick={props.handleCreateDialog}
            className="w-full py-3 mt-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomDialog;
