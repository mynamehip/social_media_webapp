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
      setVideo({ videoURL: "", playing: false, currentTime: 0 });
      setRoomName("");
    }
  };

  useEffect(() => {
    leaveAnyRoom();
    // eslint-disable-next-line
  }, []);

  return (
    <div className=" w-full h-screen flex">
      {openCreateRoom && (
        <CreateRoomDialog
          handleCreateDialog={() => setCreateRoom((prev) => !prev)}
        ></CreateRoomDialog>
      )}
      {openJoinRoom && (
        <JoinRoomDialog
          handleJoinDialog={() => setJoinRoom((prev) => !prev)}
          joinRoomName={joinRoomName}
          setJoinRoomName={setJoinRoomName}
        ></JoinRoomDialog>
      )}
      <div className=" option w-1/5 h-full">
        <WatchOption
          handleCreateDialog={() => setCreateRoom((prev) => !prev)}
          handleJoinDialog={() => setJoinRoom((prev) => !prev)}
        ></WatchOption>
      </div>
      <div className=" roomList w-4/5 h-full bg-slate-950">
        <ListRoom
          roomList={roomList}
          handleJoinDialog={() => setJoinRoom((prev) => !prev)}
          setJoinRoomName={setJoinRoomName}
        ></ListRoom>
      </div>
    </div>
  );
};

export default Index;
