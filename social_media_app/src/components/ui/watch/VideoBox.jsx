import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { FaCirclePlay } from "react-icons/fa6";
import { useWatchContext } from "./WatchContext";

const VideoBox = () => {
  const {
    connection,
    roomName,
    userList,
    admin,
    videoURL,
    videoPlaying,
    videocurrenntTime,
    setVideoPlaying,
  } = useWatchContext();

  const inputRef = useRef();
  const videoRef = useRef();
  const oldTime = useRef();
  const oldUserList = useRef([]);

  const [trigger, setTrigger] = useState(true);

  console.log(videoURL, videoPlaying, videocurrenntTime);

  const normalizeVideoUrl = (url) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      return "";
    }

    if (/^https?:\/\//i.test(trimmedUrl)) {
      return trimmedUrl;
    }

    return `https://${trimmedUrl}`;
  };

  const handleChangeVideo = async () => {
    const nextUrl = normalizeVideoUrl(inputRef.current.value);

    if (!nextUrl || !ReactPlayer.canPlay(nextUrl)) {
      return;
    }

    await connection.invoke("SendURL", roomName, nextUrl);
    inputRef.current.value = "";
  };

  const handlePlay = async () => {
    await connection.invoke("PlayVideo", connection.connectionId, roomName, true);
    setVideoPlaying(true);
  };

  const handlePause = async () => {
    if (trigger) {
      await connection.invoke("PlayVideo", connection.connectionId, roomName, false);
      setVideoPlaying(false);
    }
    setTrigger(true);
  };

  const handleSeek = async (e) => {
    const currentVideoTime = e.playedSeconds;
    if (Math.abs(currentVideoTime - oldTime.current) > 2) {
      await connection.invoke("SeekVideo", connection.connectionId, roomName, currentVideoTime);
    }
    oldTime.current = currentVideoTime;
  };

  useEffect(() => {
    if (videoRef.current && videocurrenntTime !== undefined) {
      videoRef.current.seekTo(videocurrenntTime);
      // if (videoRef.current.getInternalPlayer()) {
      //   videoRef.current.getInternalPlayer().playVideo();
      //   setTrigger(false);
      // }
      setTrigger(false);
    }
  }, [videocurrenntTime]);

  useEffect(() => {
    if (videocurrenntTime !== 0) {
      if (videoRef.current && videocurrenntTime !== 0) {
        videoRef.current.seekTo(videocurrenntTime);
        // if (videoRef.current.getInternalPlayer()) {
        //   videoRef.current.getInternalPlayer().playVideo();
        // }
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newUsers = userList.filter(
      (user) =>
        !oldUserList.current.some((oldUser) => oldUser.userConnection === user.userConnection)
    );
    oldUserList.current = userList;
    let currentVideoTime = 0;
    if (videoRef.current) {
      currentVideoTime = videoRef.current.getCurrentTime();
    }
    if (connection.connectionId === admin) {
      newUsers.forEach((user) => {
        sendVideoState(user.userConnection, currentVideoTime);
      });
    }
    // eslint-disable-next-line
  }, [userList]);

  const sendVideoState = async (userConnection, currentVideoTime) => {
    await connection.invoke("SendVideoState", userConnection, roomName, {
      videoURL: videoURL,
      playing: videoPlaying,
      currentTime: currentVideoTime,
    });
  };

  return (
    <div className="w-full h-full bg-[#0B0F1A] flex flex-col">
      <div className="flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
        {videoURL !== "" ? (
          <div className="w-full h-full relative group">
            <ReactPlayer
              ref={videoRef}
              url={videoURL}
              playing={videoPlaying}
              width="100%"
              height="100%"
              controls={true}
              onPause={handlePause}
              onPlay={handlePlay}
              onProgress={(e) => handleSeek(e)}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-white/10">
              <FaCirclePlay size={64} />
            </div>
            <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">Waiting for cinema link...</p>
          </div>
        )}
      </div>

      <div className="p-8 bg-black/40 backdrop-blur-sm border-t border-white/5">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Video Source (YouTube/Vimeo)</label>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl flex items-center px-4 focus-within:border-primary-500 transition-smooth">
            <input
              type="text"
              ref={inputRef}
              placeholder="Paste video URL here..."
              className="w-full bg-transparent py-3 text-sm text-gray-200 focus:outline-none placeholder:text-gray-600 font-medium"
            />
          </div>
          <button
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-600/20 hover:bg-red-500 active:scale-95 transition-smooth"
            onClick={handleChangeVideo}
          >
            Stream Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBox;
