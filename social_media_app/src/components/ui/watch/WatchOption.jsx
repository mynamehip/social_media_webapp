import React from "react";
import { useNavigate } from "react-router-dom";
import { TbHome, TbPlus, TbSearch } from "react-icons/tb";

const WatchOption = (props) => {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="h-full bg-white border-r border-gray-100 flex flex-col p-6 gap-8">
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-600/20">
          W
        </div>
        <span className="text-xl font-extrabold tracking-tight text-gray-900">WatchHub</span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleReturnHome}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-2xl transition-smooth group"
        >
          <TbHome size={22} className="group-hover:text-primary-600 transition-colors" />
          <span className="font-bold text-sm">Return Home</span>
        </button>

        <div className="my-4 border-t border-gray-50 pt-4">
          <p className="px-4 pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cinema Actions</p>
          
          <button
            onClick={props.handleCreateDialog}
            className="w-full flex flex-col gap-4 p-5 bg-primary-600 text-white rounded-3xl shadow-lg shadow-primary-600/20 hover:scale-[1.02] active:scale-95 transition-smooth mb-4 group overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col items-start gap-1">
              <TbPlus size={28} />
              <div className="font-extrabold text-lg">Create Room</div>
              <p className="text-xs text-white/70">Start watching together</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          </button>

          <button
            onClick={props.handleJoinDialog}
            className="w-full flex flex-col gap-4 p-5 bg-white border border-gray-100 text-gray-900 rounded-3xl shadow-sm hover:shadow-md hover:border-primary-100 transition-smooth group overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col items-start gap-1">
              <TbSearch size={28} className="text-primary-600" />
              <div className="font-extrabold text-lg">Join Room</div>
              <p className="text-xs text-gray-400 font-bold">Find an existing room</p>
            </div>
          </button>
        </div>
      </div>
      
      <div className="mt-auto p-4 bg-red-50 rounded-2xl border border-red-100">
        <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Live Beta</p>
        <p className="text-[11px] text-red-400 font-medium">Enjoy movies and videos with your friends in real-time.</p>
      </div>
    </div>
  );
};

export default WatchOption;
