import React from "react";

import Avatar from "../../base/Avatar";
import VoteBox from "./VoteBox";
import { TbMessageCircle } from "react-icons/tb";
import { hostURL } from "../../../api";

const PostBox = ({ post }) => {
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

  return (
    <div>
      <div className="text-lg font-semibold leading-tight pb-4 flex items-center gap-3">
        <div className=" w-10 h-10">
          <Avatar avatar={post.avatar}></Avatar>
        </div>
        {post.userName}
      </div>
      <div className={`${post.content && "pb-4"}`}>
        {handleContent(post.content)}
      </div>
      <div
        className={` w-full flex items-center justify-center ${
          post.imagePath && "pb-4"
        }`}
      >
        {post.imagePath && (
          <img
            src={hostURL + post.imagePath}
            alt=""
            className=" w-full max-h-96 rounded-md object-contain"
          />
        )}
      </div>
      <div className="flex items-center gap-1">
        <VoteBox post={post}></VoteBox>
        <div className=" text-xl pl-5">
          <TbMessageCircle />
        </div>
        {post.comment}
      </div>
    </div>
  );
};

export default PostBox;
