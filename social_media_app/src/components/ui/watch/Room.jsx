import React, { useEffect } from "react";
import { useWatchContext } from "./WatchContext";
import ChatBox from "./ChatBox";
import VideoBox from "./VideoBox";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { TbArrowLeft, TbLock, TbUsers } from "react-icons/tb";

const Room = () => {
  const { roomMessages, connection, roomName, setRoomName, userList, admin, setVideo } =
    useWatchContext();

  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/watch");
  };

  if (roomName === "") {
    navigate("/watch");
  }

  const leaveAnyRoom = async () => {
    if (roomName !== "") {
      await connection.invoke("LeaveWatchRoom", connection.connectionId, roomName);
      setVideo("", false, 0);
      setRoomName("");
    }
  };

  const handleKickUser = async (value) => {
    if (connection.connectionId === admin) {
      if (value.userConnection === connection.connectionId) {
        return;
      }
      await connection.invoke("KickUser", value.userConnection, roomName);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      leaveAnyRoom();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-screen bg-[#0B0F1A] flex flex-col font-inter overflow-hidden">
      {/* Theater Top Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLeave}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-smooth"
          >
            <TbArrowLeft size={24} />
          </button>
          <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-extrabold tracking-tight">{roomName}</h2>
              <TbLock size={14} className="text-gray-500" />
            </div>
            <p className="text-[10px] text-primary-400 font-bold uppercase tracking-widest">Cinema Room • Live</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
            <TbUsers size={16} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-200">{userList.length}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left mini sidebar for users */}
        <aside className="w-16 lg:w-20 border-r border-white/5 flex flex-col py-6 items-center gap-6 bg-black/20 overflow-y-auto no-scrollbar shrink-0">
          <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/20 mb-2">
            R
          </div>
          <UserList userList={userList} handleClick={handleKickUser} />
        </aside>

        {/* Video Player */}
        <main className="flex-1 flex flex-col bg-black overflow-hidden relative group">
          <VideoBox />
          
          {/* Subtle Overlay to make it feel more "theater-like" */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        </main>

        {/* Chat / Sidebar */}
        <aside className="hidden lg:flex w-[350px] xl:w-[400px] border-l border-white/5 flex-col bg-[#0B0F1A] shrink-0">
          <ChatBox messages={roomMessages} connection={connection} roomName={roomName} />
        </aside>
      </div>
    </div>
  );
};

export default Room;
