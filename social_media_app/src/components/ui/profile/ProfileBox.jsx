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
    <div>
      {isOpenNewPost && (
        <CreatePostBox
          handleOpenNewPost={handleOpenNewPost}
          onCreatePost={loadUserActivities}
        ></CreatePostBox>
      )}
      <div className=" bg-glass min-h-80">
        <div onClick={handleClick}>
          <div className=" h-28 bg-white rounded-xl m-2 flex items-center justify-center overflow-hidden">
            {user.cover && (
              <img src={hostURL + user.cover} alt="" className="object-cover" />
            )}
            <div className="absolute h-20 w-20 object-cover rounded-full top-20">
              <Avatar avatar={user.avatar}></Avatar>
            </div>
          </div>
          <div className="flex flex-col items-center pt-10">
            <div className=" text-base font-semibold">{user.userName}</div>
          </div>
          <div className="flex justify-around m-4 p-2 border-t-2 border-b-2 border-white/40">
            <div className="flex flex-col items-center">
              <div className=" text-base font-semibold">Follower</div>
              <div className=" text-sm">{userActivities.follower}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className=" text-base font-semibold">Post</div>
              <div className=" text-sm">{userActivities.postNumber}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 items-center">
          <Button fill onClick={handleOpenNewPost}>
            New Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
