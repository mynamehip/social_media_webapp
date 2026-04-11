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
  const [videoURL, setVideoURL] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videocurrenntTime, setVideoCurrentTime] = useState(0);

  const setVideo = (url, playing, currentTime) => {
    setVideoURL(url);
    setVideoPlaying(playing);
    setVideoCurrentTime(currentTime);
  };

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
        setRoomList(list);
      });

      conn.on("ReceiveRoomMessage", (userName, messageText, timestamp) => {
        setRoomMessages((prev) => [...prev, { userName, messageText, timestamp }]);
      });

      conn.on("ReceiveRoomUser", (adminConnection, userList) => {
        setAdmin(adminConnection);
        setUserList(userList);
      });

      conn.on("ReceiveRoomVideo", ({ videoURL, playing, currentTime }) => {
        setVideoURL(videoURL);
        setVideoPlaying(playing);
        setVideoCurrentTime(currentTime);
      });

      conn.on("ReceiveVideoURL", (url) => {
        setVideoURL(url);
      });

      conn.on("ReceiveVideoPlay", (playing) => {
        setVideoPlaying(playing);
      });

      conn.on("ReceiveVideoSeek", (currentTime) => {
        setVideoCurrentTime(currentTime);
      });

      conn.on("ReceiveKickMessage", (mess) => {
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
        roomList,
        videoURL,
        videoPlaying,
        videocurrenntTime,
        setVideo,
        setVideoPlaying,
      }}
    >
      {children}
    </WatchHubContext.Provider>
  );
};
