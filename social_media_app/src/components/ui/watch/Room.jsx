import React, { useEffect } from "react";

import { useWatchContext } from "./WatchContext";
import ChatBox from "./ChatBox";
import VideoBox from "./VideoBox";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";

const Room = () => {
  const { roomMessages, connection, roomName, setRoomName, userList, admin, video, setVideo } =
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
      setVideo({ videoURL: "", playing: false, currentTime: 0 });
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
    <div className=" w-screen h-screen flex">
      <div className=" w-[7%] h-full bg-black">
        <div className=" w-full h-[8%] flex justify-center items-center">
          <button
            className=" px-4 py-1 rounded-md border-2 border-red-500 text-red-400"
            onClick={handleLeave}
          >
            Leave
          </button>
        </div>
        <div className=" w-full h-[92%] pt-4">
          <UserList userList={userList} handleClick={handleKickUser}></UserList>
        </div>
      </div>
      <div className=" w-[65%] h-full">
        <VideoBox
          connection={connection}
          roomName={roomName}
          userList={userList}
          admin={admin}
          video={video}
          setVideo={setVideo}
        ></VideoBox>
      </div>
      <div className=" w-[28%] h-full">
        <ChatBox messages={roomMessages} connection={connection} roomName={roomName}></ChatBox>
      </div>
    </div>
  );
};

export default Room;
