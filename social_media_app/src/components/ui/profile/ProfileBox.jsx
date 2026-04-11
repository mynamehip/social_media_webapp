import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreatePostBox from "../post/CreatePostBox";
import Button from "../../base/Button";
import Avatar from "../../base/Avatar";

import { UserContext } from "../../../layouts/Home";
import { hostURL } from "../../../api";
import { getUserActivities } from "../../../actions/userAction";

const ProfileBox = () => {
  const user = useContext(UserContext);
  const [userActivities, setUserActivities] = useState({
    follower: 0,
    following: 0,
    postNumber: 0,
  });

  useEffect(() => {
    loadUserActivities();
    // eslint-disable-next-line
  }, []);

  const loadUserActivities = async () => {
    try {
      const result = await getUserActivities(user.id);
      setUserActivities(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/profile/${user.id}`);
  };

  const [isOpenNewPost, setOpenNewPost] = useState(false);
  const handleOpenNewPost = () => {
    setOpenNewPost(!isOpenNewPost);
  };

  return (
    <div className="w-full">
      {isOpenNewPost && (
        <CreatePostBox 
          handleOpenNewPost={handleOpenNewPost} 
          onCreatePost={loadUserActivities} 
        />
      )}
      <div className="bg-white border border-gray-200/60 rounded-[32px] overflow-hidden shadow-md shadow-gray-200/50 hover:shadow-lg transition-smooth">
        <div className="cursor-pointer" onClick={handleClick}>
          <div className="h-24 bg-gradient-to-r from-primary-500 to-primary-600 relative">
            {user.cover && (
              <img 
                src={hostURL + "/Images/" + user.cover} 
                alt="" 
                className="w-full h-full object-cover opacity-80" 
              />
            )}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 p-1 bg-white rounded-full shadow-lg">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                <Avatar avatar={user.avatar} />
              </div>
            </div>
          </div>
          
          <div className="pt-12 pb-6 text-center">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">{user.userName}</h2>
            <p className="text-xs text-gray-500 font-medium">@{user.userName?.toLowerCase().replace(/\s/g, "")}</p>
          </div>

          <div className="flex border-t border-gray-50">
            <div className="flex-1 py-4 flex flex-col items-center border-r border-gray-50 hover:bg-gray-50 transition-colors">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Followers</span>
              <span className="text-base font-extrabold text-gray-900">{userActivities.follower}</span>
            </div>
            <div className="flex-1 py-4 flex flex-col items-center hover:bg-gray-50 transition-colors">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Posts</span>
              <span className="text-base font-extrabold text-gray-900">{userActivities.postNumber}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50/50">
          <Button 
            fill 
            onClick={handleOpenNewPost} 
            css="w-full py-2.5 rounded-2xl shadow-primary-600/10 hover:shadow-lg transition-smooth"
          >
            Create New Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
