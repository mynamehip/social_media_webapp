import React, { useContext, useState } from "react";
import { toast, Slide } from "react-toastify";

import Avatar from "../../base/Avatar";
import VoteBox from "./VoteBox";
// import { TbMessageCircle } from "react-icons/tb";
import { FaCircleXmark } from "react-icons/fa6";
import { UserContext } from "../../../layouts/Home";
import ConfrimDialog from "../option/ConfrimDialog";

import { hostURL } from "../../../api";
import { deletePost } from "../../../actions/postAction";

const PostBox = ({ post, loadMethod }) => {
  const user = useContext(UserContext);
  const [isOpenDialog, setOpenDialog] = useState(false);

  const handleContent = (content) => {
    if (!content) {
      return null;
    }
    const lines = content.includes("\n") ? content.split("\n") : [content];
    return (
      <div>
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const handleOpenDialog = () => {
    setOpenDialog(!isOpenDialog);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.postId);
      handleOpenDialog();
      loadMethod();
      toast.success("Delete successed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isOpenDialog && <ConfrimDialog header={"Confirm"} message={"Are you sure wanna delete this?"} actionMethod={handleDeletePost} cancelMethod={handleOpenDialog}></ConfrimDialog>}
      <div className=" flex justify-between">
        <div className="text-lg font-semibold leading-tight pb-4 flex items-center gap-3">
          <div className=" w-10 h-10">
            <Avatar avatar={post.avatar}></Avatar>
          </div>
          {post.userName}
        </div>
        {user?.id === post.userId ? (
          <div className=" text-2xl text-white">
            <FaCircleXmark onClick={handleOpenDialog} />
          </div>
        ) : null}
      </div>
      <div className={`${post.content && "pb-4"}`}>{handleContent(post.content)}</div>
      <div className={` w-full flex items-center justify-center ${post.imagePath && "pb-4"}`}>
        {post.imagePath && <img src={hostURL + "/Images/" + post.imagePath} alt="" className=" w-full max-h-96 rounded-md object-contain" />}
      </div>
      <div className="flex items-center gap-1">
        <VoteBox post={post}></VoteBox>
        {/* <div className=" text-xl pl-5">
          <TbMessageCircle />
        </div>
        {post.comment} */}
      </div>
    </div>
  );
};

export default PostBox;
