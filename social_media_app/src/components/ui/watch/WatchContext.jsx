import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { hostURL } from "../../../api";

const WatchHubContext = createContext();

export const useWatchContext = () => {
  return useContext(WatchHubContext);
};

export const WatchHubProvider = ({ children }) => {
  const user = useSelector((state) => {
    return state.authReducer?.data?.user ?? null;
  });

  const [connection, setConnection] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [roomMessages, setRoomMessages] = useState();
  const [userList, setUserList] = useState([]);
  const [admin, setAdmin] = useState("");
  const [video, setVideo] = useState({
    videoURL: "",
    isPlaying: false,
    currentTIme: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const connect = async () => {
      if (user === null) {
        return;
      }

      const conn = new HubConnectionBuilder()
        .withUrl(`${hostURL}/Watch`)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      conn.on("ReceiveRoomList", (list) => {
        console.log(list);
        setRoomList(list);
      });

      conn.on("ReceiveRoomMessage", (userName, messageText, timestamp) => {
        setRoomMessages((prev) => [...prev, { userName, messageText, timestamp }]);
      });

      conn.on("ReceiveRoomUser", (adminConnection, userList) => {
        setAdmin(adminConnection);
        setUserList(userList);
      });

      conn.on("ReceiveRoomVideo", (videoState) => {
        setVideo(videoState);
      });

      conn.on("ReceiveKickMessage", (mess) => {
        console.log(mess);
        navigate("/watch");
        setRoomName("");
      });

      await conn.start();
      setConnection(conn);
    };

    connect();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
    // eslint-disable-next-line
  }, [user?.id]);

  return (
    <WatchHubContext.Provider
      value={{
        connection,
        user,
        roomMessages,
        setRoomMessages,
        roomName,
        setRoomName,
        userList,
        admin,
        video,
        setVideo,
        roomList,
      }}
    >
      {children}
    </WatchHubContext.Provider>
  );
};
