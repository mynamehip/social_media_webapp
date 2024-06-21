import React from "react";

import { posts } from "../data/fakePost";
import {
  TbArrowBigUp,
  TbArrowBigDown,
  TbArrowBigUpFilled,
  TbArrowBigDownFilled,
  TbMessageCircle,
} from "react-icons/tb";

const NewsBox = () => {
  return (
    <div className="w-full flex-1 overflow-scroll no-scrollbar space-y-5">
      {posts.map((post, index) => (
        <div
          key={index}
          className="w-full h-auto bg-glass p-4 flex flex-col gap-4"
        >
          <div className="text-lg font-semibold leading-tight">
            #{post.name}
          </div>
          <div className=" leading-slug">{post.title}</div>
          <div className=" w-full flex items-center justify-center">
            <img
              src={post.img}
              alt=""
              className=" w-full max-h-96 rounded-md object-cover"
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="text-xl">
              {post.voted === 1 ? <TbArrowBigUpFilled /> : <TbArrowBigUp />}{" "}
            </div>
            {post.up}
            <div className="text-xl pl-5">
              {post.voted === -1 ? (
                <TbArrowBigDownFilled />
              ) : (
                <TbArrowBigDown />
              )}
            </div>
            {post.down}
            <div className=" text-xl pl-5">
              <TbMessageCircle />
            </div>
            {post.comment}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsBox;
