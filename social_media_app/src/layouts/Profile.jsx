import React, { useContext, useRef, useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import Avatar from "../components/base/Avatar";
import Button from "../components/base/Button";
import NewPostBox from "../components/ui/post/NewPostBox";
import UserInforBox from "../components/ui/profile/UserInforBox";
import ChangeImageBox from "../components/ui/profile/ChangeImageBox";

import { FaPen } from "react-icons/fa";
import { hostURL } from "../api";
import { UserContext } from "./Home";
import { getUser } from "../actions/userAction";

const Profile = () => {
  const { userId } = useParams();

  const userContext = useContext(UserContext);
  const mainUser = useMemo(() => userContext || {}, [userContext]);

  const scrollDiv = useRef();

  const [user, setUser] = useState(mainUser);
  const [isOpenNewPost, setOpenNewPost] = useState(false);
  const [type, setType] = useState();

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (userId !== mainUser.id) {
          const res = await getUser(userId);
          setUser(res.data);
        } else {
          setUser(mainUser);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
    // eslint-disable-next-line
  }, [userId, mainUser]);

  const handleOpenForm = (value) => {
    if (value !== null) {
      setType(value);
    }
    setOpenNewPost(!isOpenNewPost);
  };

  if (userId === "undefined") {
    return (
      <div className=" bg-glass h-full flex items-center justify-center text-center text-lg pb-5">
        <span>
          <Link to={"/sign-in"} className="underline text-blue-800">
            Sign-in
          </Link>{" "}
          to know more
        </span>
      </div>
    );
  } else
    return (
      <div className="overflow-y-scroll w-full flex-1">
        {isOpenNewPost && (
          <ChangeImageBox
            type={type}
            handleOpenForm={handleOpenForm}
          ></ChangeImageBox>
        )}
        <div className=" space-y-5" id="scrollableDivRef" ref={scrollDiv}>
          <div className=" bg-glass rounded-xl">
            <div className=" relative max-h-80">
              <div className=" rounded-t-xl min-h-48 max-h-80 flex flex-col items-center justify-center overflow-hidden bg-white">
                {user.cover && (
                  <img
                    src={hostURL + user.cover}
                    alt=""
                    className=" w-full object-cover"
                  />
                )}
                {userId === mainUser.id ? (
                  <div
                    className=" h-8 w-8 bg-black hover:bg-gray-500 text-white flex items-center justify-center rounded-full absolute right-2 bottom-2"
                    onClick={() => handleOpenForm("cover")}
                  >
                    <FaPen></FaPen>
                  </div>
                ) : null}

                <div className=" h-28 w-28 absolute bottom-[-3.5rem] left-7 mb-1">
                  <Avatar avatar={user.avatar}></Avatar>
                  {userId === mainUser.id ? (
                    <div
                      className=" h-8 w-8 bg-black hover:bg-gray-500 text-white flex items-center justify-center rounded-full absolute right-0 bottom-1"
                      onClick={() => handleOpenForm("avatar")}
                    >
                      <FaPen></FaPen>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className=" py-2 pr-7 flex justify-between items-center pl-40">
              <div className=" text-2xl font-bold">{user.userName}</div>
              <Button fill>Change information</Button>
            </div>
            <div className=" border-t-2 border-white/40">
              <UserInforBox></UserInforBox>
            </div>
            <div className="flex p-2 border-t-2 border-white/40">
              <div className=" w-1/3 p-1 flex flex-col items-center hover:cursor-pointer hover:bg-[#ffffff80] rounded-xl">
                <div className=" text-base font-semibold">Following</div>
                <div className=" text-sm">5000000000</div>
              </div>
              <div className=" w-1/3 p-1 flex flex-col items-center hover:cursor-pointer hover:bg-[#ffffff80] rounded-xl">
                <div className=" text-base font-semibold">Follower</div>
                <div className=" text-sm">5000000000</div>
              </div>
              <div className=" w-1/3 p-1 flex flex-col items-center hover:cursor-pointer hover:bg-[#ffffff80] rounded-xl">
                <div className=" text-base font-semibold">Post</div>
                <div className=" text-sm">0</div>
              </div>
            </div>
          </div>
          <div className=" ">
            <NewPostBox userId={userId}></NewPostBox>
          </div>
        </div>
      </div>
    );
};

export default Profile;
