import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

import { FaCirclePlay } from "react-icons/fa6";

const VideoBox = ({ connection, roomName, userList, admin, video, setVideo }) => {
  const inputRef = useRef();
  const videoRef = useRef();
  const oldTime = useRef();
  const oldList = useRef([]);

  const handleChangeVideo = async () => {
    sendVideoState({
      videoURL: inputRef.current.value,
      playing: false,
      currentTime: 0,
    });
    inputRef.current.value = "";
  };

  const sendVideoState = async (videoState, userConnection) => {
    await connection.invoke("SendVieoState", userConnection, roomName, videoState);
  };

  useEffect(() => {
    if (videoRef.current) {
      const player = videoRef.current.getInternalPlayer();
      if (player) {
        try {
          if (video.playing) {
            player.playVideo();
          } else {
            player.pauseVideo();
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [video]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(video.currentTime);
    }
  }, [video.currentTime]);

  useEffect(() => {
    if (connection && admin === connection.connectionId) {
      const difference = userList.filter((item) => !oldList.current.includes(item));
      oldList.current = userList;
      let currentVideoTime;
      if (videoRef.current) {
        const player = videoRef.current.getInternalPlayer();
        if (player) {
          currentVideoTime = player.getCurrentTime();
        }
      }
      console.log({
        videoURL: video.videoURL,
        playing: video.playing,
        currentTime: currentVideoTime,
      });
      difference.forEach((element) => {
        if (element === admin) {
          return;
        }
        sendVideoState({
          videoURL: video.videoURL,
          playing: video.playing,
          currentTime: currentVideoTime,
        });
      });
    }
    // eslint-disable-next-line
  }, [userList]);

  const handlePlay = () => {
    sendVideoState({ ...video, playing: true });
  };

  const handlePause = () => {
    sendVideoState({ ...video, playing: false });
  };

  const handleSeek = (e) => {
    if (e.playedSeconds - oldTime.current > 3 || e.playedSeconds - oldTime.current < -3) {
      sendVideoState({ ...video, currentTime: e.playedSeconds });
    }
    oldTime.current = e.playedSeconds;
  };

  return (
    <div className="w-full h-full bg-slate-800">
      {video.videoURL !== "" ? (
        <div onClick={handleSeek} className=" w-full h-[80%]">
          <ReactPlayer
            ref={videoRef}
            url={video.videoURL}
            playing={video.playing}
            width="100%"
            height="100%"
            controls={true}
            onPause={handlePause}
            onPlay={handlePlay}
            onProgress={(e) => handleSeek(e)}
          />
        </div>
      ) : (
        <div className=" w-full h-[70%] bg-slate-500 flex items-center justify-center text-9xl">
          <FaCirclePlay />
        </div>
      )}

      <div className="p-5 flex">
        <input
          type="text"
          ref={inputRef}
          className="flex-1 mr-5 px-2 rounded-md bg-slate-500 text-white focus:outline-none"
        />
        <button
          className="px-4 py-1 rounded-md border-2 border-green-700 text-green-400 hover:bg-green-700 hover:text-white"
          onClick={handleChangeVideo}
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default VideoBox;
