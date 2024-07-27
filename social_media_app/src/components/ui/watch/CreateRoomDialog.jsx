import React, { useState } from "react";

import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useWatchContext } from "./WatchContext";

const CreateRoomDialog = (props) => {
  const { connection, setRoomMessages, setRoomName, user } = useWatchContext();

  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    password: "",
    userConnection: connection.connectionId,
    userName: user.userName,
    avatar: user.avatar,
  });

  const navigate = useNavigate();
  const handleCreateRoom = async () => {
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
    <div className=" w-screen h-screen fixed bg-[#00000070]">
      <div className=" lg:w-1/3 md:w-1/2 w-[90%] bg-white absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]">
        <div className=" grid grid-cols-4 py-2">
          <div className=" col-start-2 col-span-2 justify-self-center md:text-xl text-lg font-semibold">
            Create new room
          </div>
          <button onClick={props.handleCreateDialog} className=" justify-self-end mr-3 text-2xl">
            <IoMdCloseCircle />
          </button>
        </div>
        <hr />
        <div className=" px-4">
          <div className=" w-full flex font-medium py-2">
            Name:
            <input
              type="text"
              className=" flex-1 focus:outline-none border-b border-gray-700 ml-2 font-normal"
              onChange={(e) => setRoomInfo((prev) => ({ ...prev, roomName: e.target.value }))}
            />
          </div>
          {/* <div className=" pb-2 flex gap-2 font-medium items-center">
            Control level:
            <input
              type="radio"
              name="controlLevel"
              id="admin"
              className=" ml-4"
              checked={!roomInfo.controllable}
              onChange={() => setRoomInfo((prev) => ({ ...prev, controllable: false }))}
            />
            <label htmlFor="admin">Admin</label>
            <input
              type="radio"
              name="controlLevel"
              id="everyone"
              className=" ml-4"
              checked={roomInfo.controllable}
              onChange={() => setRoomInfo((prev) => ({ ...prev, controllable: true }))}
            />
            <label htmlFor="everyone">All</label>
          </div> */}
          <div className=" pb-2 flex gap-2 font-medium">
            Access tpye:
            <input
              type="radio"
              name="accessType "
              id="publicButton"
              className=" ml-4"
              checked={!roomInfo.roomType}
              onChange={() => setRoomInfo((prev) => ({ ...prev, roomType: false }))}
            />
            <label htmlFor="publicButton">Public</label>
            <input
              type="radio"
              name="accessType "
              id="privateButton"
              className=" ml-4"
              checked={roomInfo.roomType}
              onChange={() => setRoomInfo((prev) => ({ ...prev, roomType: true }))}
            />
            <label htmlFor="privateButton">Private</label>
          </div>
          {roomInfo.roomType && (
            <div className=" w-full flex font-medium pb-2">
              Password:
              <input
                type="text"
                className=" flex-1 focus:outline-none border-b border-gray-700 ml-2 font-normal"
                onChange={(e) => setRoomInfo((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
          )}
        </div>
        <div className=" flex justify-end px-4 pb-2">
          <button
            className=" px-4 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-lg font-semibold"
            onClick={handleCreateRoom}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomDialog;
