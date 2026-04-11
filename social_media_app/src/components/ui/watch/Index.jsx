import React, { useEffect, useState } from "react";
import WatchOption from "./WatchOption";
import CreateRoomDialog from "./CreateRoomDialog";
import JoinRoomDialog from "./JoinRoomDialog";
import ListRoom from "./ListRoom";
import { useWatchContext } from "./WatchContext";

const Index = () => {
  const [openCreateRoom, setCreateRoom] = useState(false);
  const [openJoinRoom, setJoinRoom] = useState(false);
  const [joinRoomName, setJoinRoomName] = useState("");

  const { connection, roomName, setRoomName, setVideo, roomList } = useWatchContext();
  const leaveAnyRoom = async () => {
    if (roomName !== "") {
      await connection.invoke("LeaveWatchRoom", connection.connectionId, roomName);
      setVideo("", false, 0);
      setRoomName("");
    }
  };

  useEffect(() => {
    leaveAnyRoom();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-screen flex bg-[#F1F5F9] font-inter overflow-hidden">
      {openCreateRoom && (
        <CreateRoomDialog
          handleCreateDialog={() => setCreateRoom((prev) => !prev)}
        />
      )}
      {openJoinRoom && (
        <JoinRoomDialog
          handleJoinDialog={() => setJoinRoom((prev) => !prev)}
          joinRoomName={joinRoomName}
          setJoinRoomName={setJoinRoomName}
        />
      )}
      <div className="w-[300px] lg:w-[350px] shrink-0 h-full">
        <WatchOption
          handleCreateDialog={() => setCreateRoom((prev) => !prev)}
          handleJoinDialog={() => setJoinRoom((prev) => !prev)}
        />
      </div>
      <div className="flex-1 h-full overflow-hidden flex flex-col">
        <div className="p-8 pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Active Rooms</h1>
          <p className="text-gray-500 font-medium">Join a room and watch content with people around the world.</p>
        </div>
        <div className="flex-1 overflow-hidden">
          <ListRoom
            roomList={roomList}
            handleJoinDialog={() => setJoinRoom((prev) => !prev)}
            setJoinRoomName={setJoinRoomName}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
