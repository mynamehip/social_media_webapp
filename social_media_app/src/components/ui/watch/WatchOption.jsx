import React from "react";
import { useNavigate } from "react-router-dom";

import { FaPlusCircle, FaSearchPlus } from "react-icons/fa";

const WatchOption = (props) => {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className=" h-full flex flex-col">
      <button
        className=" bg-red-600 px-4 py-2 m-2 mb-10 rounded-lg text-white text-lg font-bold hover:border-none hover:bg-red-500 hover:text-white"
        onClick={handleReturnHome}
      >
        Return Home
      </button>
      <button
        className=" h-[20%] m-2 rounded-lg border-2 border-green-700 bg-green-400 text-green-900 hover:bg-green-500 flex flex-col items-center justify-center gap-5"
        onClick={props.handleCreateDialog}
      >
        <div className=" text-xl font-bold">Create Room</div>
        <div className=" text-xl">
          <FaPlusCircle />
        </div>
      </button>
      <button
        className=" h-[15%] m-2 rounded-lg border-2 border-blue-700 bg-blue-400 text-blue-900 hover:bg-blue-500 flex flex-col items-center justify-center gap-4"
        onClick={props.handleJoinDialog}
      >
        <div className=" text-xl font-bold">Join Room</div>
        <div className=" text-xl">
          <FaSearchPlus />
        </div>
      </button>
    </div>
  );
};

export default WatchOption;
