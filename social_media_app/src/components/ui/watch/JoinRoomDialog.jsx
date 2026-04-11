import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchContext } from "./WatchContext";
import { TbX, TbDoorEnter } from "react-icons/tb";

const JoinRoomDialog = (props) => {
  const { connection, setRoomMessages, setRoomName, user } = useWatchContext();

  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    password: "",
    userConnection: connection.connectionId,
    userName: user.userName,
    avatar: user.avatar,
  });

  useEffect(() => {
    setRoomInfo((prev) => ({ ...prev, roomName: props.joinRoomName }));
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const handleJoinRoom = async () => {
    if (!roomInfo.roomName.trim()) return;
    try {
      setRoomMessages([]);
      setRoomName(roomInfo.roomName);
      await connection.invoke(
        "JoinWatchRoom",
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

  const handleClose = () => {
    props.handleJoinDialog();
    props.setJoinRoomName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-white rounded-[32px] shadow-2xl shadow-black/20 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="relative p-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Join Room</h2>
            <p className="text-sm text-gray-500 font-medium">Connect to an ongoing session</p>
          </div>
          <button 
            onClick={handleClose} 
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-smooth"
          >
            <TbX size={20} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Room ID / Name</label>
            <input
              type="text"
              value={roomInfo.roomName}
              placeholder="e.g. Cinema-402"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold text-gray-900"
              onChange={(e) => setRoomInfo((prev) => ({ ...prev, roomName: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <input
              type="password"
              placeholder="If required"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium text-gray-900"
              onChange={(e) => setRoomInfo((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>
        </div>

        <div className="p-8 pt-0 mt-2">
          <button
            className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-smooth flex items-center justify-center gap-2"
            onClick={handleJoinRoom}
          >
            <TbDoorEnter size={20} />
            Enter Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomDialog;
