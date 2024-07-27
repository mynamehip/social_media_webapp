import React, { useEffect, useState } from "react";

import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useWatchContext } from "./WatchContext";

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
    <div className=" w-screen h-screen fixed bg-[#00000070]">
      <div className=" lg:w-1/3 md:w-1/2 w-[90%] bg-white absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]">
        <div className=" grid grid-cols-4 py-2">
          <div className=" col-start-2 col-span-2 justify-self-center md:text-xl text-lg font-semibold">
            Join room
          </div>
          <button onClick={handleClose} className=" justify-self-end mr-3 text-2xl">
            <IoMdCloseCircle />
          </button>
        </div>
        <hr />
        <div className=" px-4">
          <div className=" w-full flex font-medium py-2">
            Name:
            <input
              type="text"
              value={roomInfo.roomName}
              className=" flex-1 focus:outline-none border-b border-gray-700 ml-2 font-normal"
              onChange={(e) => setRoomInfo((prev) => ({ ...prev, roomName: e.target.value }))}
            />
          </div>
          <div className=" w-full flex font-medium pb-2 mt-5">
            Password:
            <input
              type="text"
              className=" flex-1 focus:outline-none border-b border-gray-700 ml-2 font-normal"
              onChange={(e) => setRoomInfo((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>
        </div>
        <div className=" flex justify-end px-4 pb-2">
          <button
            className=" px-4 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-lg font-semibold"
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoomDialog;
