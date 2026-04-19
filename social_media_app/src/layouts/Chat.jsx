import React, { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ChatBox from "../components/ui/chat/ChatBox";
import FollowingList from "../components/ui/chat/FollowingList";
import ChatHistories from "../components/ui/chat/ChatHistories";
import MiniChatMenu from "../components/ui/chat/MiniChatMenu";

import { getUser } from "../actions/userAction";
import { useChatContext } from "../components/ui/chat/ChatContext";
import { getChatHistory } from "../actions/chatAction";

const Chat = () => {
  const [friend, setFriend] = useState();
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/");
  };

  const user = useSelector((state) => state.authReducer?.data?.user ?? null);

  const { setHasNewMessages, connection, setUnread, setChats } =
    useChatContext();

  useEffect(() => {
    const load = async () => {
      setHasNewMessages(false);
      const r = await getChatHistory(user?.id);
      setChats(r.data);
    };
    load();
    // eslint-disable-next-line
  }, []);

  const handleClickUser = async (id) => {
    const u = await getUser(id);
    connection.invoke("ReadedMessage", id, user.id);
    setUnread((prev) => {
      return prev.filter((e) => e.senderId !== id);
    });
    setFriend(u.data);
  };

  return (
    <div className="w-full h-screen bg-[#F1F5F9] flex justify-center font-inter overflow-hidden md:p-4 lg:p-6">
      <div className="w-full max-w-[1240px] h-full bg-white md:rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Mobile Sidebar Trigger (Optional but handled via MiniChatMenu) */}
        <MiniChatMenu
          chat={
            <ChatHistories
              activeId={friend?.id}
              handleClickUser={handleClickUser}
            />
          }
          following={
            <FollowingList handleClickUser={handleClickUser} />
          }
          handleReturn={handleReturn}
        />

        {/* Sidebar: Conversations & Contacts */}
        <div className="hidden md:flex flex-col w-[320px] lg:w-[380px] h-full border-r border-gray-100 flex-shrink-0">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Messages</h1>
              <button 
                onClick={handleReturn}
                className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-smooth"
                title="Back to Home"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Chats</div>
            <ChatHistories
              activeId={friend?.id}
              handleClickUser={handleClickUser}
            />
            
            <div className="px-3 py-4 mt-4 border-t border-gray-50">
              <div className="pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connect with People</div>
              <FollowingList handleClickUser={handleClickUser} />
            </div>
          </div>
        </div>

        {/* Chat Content: Active Room */}
        <div className="flex-1 h-full bg-[#FAFAFA] flex flex-col relative overflow-hidden">
          {friend !== undefined ? (
            <ChatBox user={user} friend={friend} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in-95 duration-700">
              <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-6 text-primary-600 shadow-inner">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500 max-w-[280px]">Choose a friend from the list to start sharing moments and chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Chat);

