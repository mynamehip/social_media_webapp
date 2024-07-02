import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../base/Avatar";
import Button from "../base/Button";

import {
  followUser,
  unfollowUser,
  getAllFollowing,
} from "../../actions/userAction";
import { UserContext } from "../../layouts/Home";

const ListUserBox = ({ users }) => {
  const following = useSelector((state) => state.followingReducer);
  const dispatch = useDispatch();
  const user = useContext(UserContext);

  if (users === undefined) {
    users = following;
  }

  useEffect(() => {
    const load = async () => {
      try {
        dispatch(getAllFollowing(user.id));
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, [dispatch, user.id]);

  const isFollowing = (userId) => {
    return (
      following &&
      following.length > 0 &&
      following.some((item) => item.id === userId)
    );
  };

  const handleFollow = async (item) => {
    try {
      if (isFollowing(item.id)) {
        dispatch(unfollowUser(user.id, item));
      } else {
        dispatch(followUser(user.id, item));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col gap-2 px-5 pb-2">
      {users &&
        users.map((item, index) => (
          <div
            key={index}
            className=" flex gap-4 items-center bg-white p-2 rounded-xl"
          >
            <div className=" h-12 w-12">
              <Avatar avatar={item.avtar}></Avatar>
            </div>
            <div>
              <div className=" text-base font-semibold">{item.userName}</div>
              <div className=" text-xs">Ahuhu</div>
            </div>
            <div className=" text-xs ml-auto">
              {isFollowing(item.id) ? (
                <Button
                  onClick={() => {
                    handleFollow(item);
                  }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  fill
                  onClick={() => {
                    handleFollow(item);
                  }}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListUserBox;
