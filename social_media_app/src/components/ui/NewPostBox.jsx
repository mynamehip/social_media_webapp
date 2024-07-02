import React, { useState, useEffect, useRef } from "react";

import { getAllPost } from "../../actions/postAction";
import { hostURL } from "../../api";

import Avatar from "../base/Avatar";
import VoteBox from "./VoteBox";
import { TbMessageCircle } from "react-icons/tb";

const PostBox = () => {
  const scrollDiv = useRef();

  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [loadAble, setLoadAble] = useState(true);

  const load = async (pageNumber) => {
    if (isLoading) return;
    setLoading(true);
    try {
      const response = await getAllPost(pageNumber);
      if (response.data.length < 10) {
        setLoadAble(false);
      }
      setPosts((prePosts) => [...prePosts, ...response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (
        e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 100
      ) {
        if (loadAble && !isLoading) {
          setPageNumber((prev) => prev + 1);
        }
      }
    };

    const scrollableDiv = scrollDiv.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadAble, isLoading]);

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
    <div
      className="w-full flex-1 overflow-y-scroll space-y-5"
      id="scrollableDivRef"
      ref={scrollDiv}
    >
      {posts.map((post, index) => (
        <div key={index} className="w-full h-auto bg-glass p-4 flex flex-col">
          <div className="text-lg font-semibold leading-tight pb-4 flex items-center gap-3">
            <div className=" w-10 h-10">
              <Avatar></Avatar>
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
            <img
              src={`${hostURL}${post.imagePath}`}
              alt=""
              className=" w-full max-h-96 rounded-md object-cover"
            />
          </div>
          <div className="flex items-center gap-1">
            <VoteBox post={post}></VoteBox>
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

export default PostBox;
