import React, { useState, useEffect, useRef } from "react";

import { getAllPost, getPostByUser } from "../../../actions/postAction";
import PostBox from "../post/PostBox";
import { RiLoader4Line } from "react-icons/ri";

const NewPostBox = ({ userId }) => {
  const scroll = useRef();

  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [loadAble, setLoadAble] = useState(true);

  const load = async (pageNumber) => {
    if (isLoading) return;
    setLoading(true);
    try {
      var response;
      if (userId === undefined) {
        response = await getAllPost(pageNumber);
      } else {
        response = await getPostByUser(userId, pageNumber);
      }
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

  const reload = () => {
    setPosts([]);
    setPageNumber(1);
    load(1);
  };

  useEffect(() => {
    setPosts([]);
    setPageNumber(1);
  }, [userId]);

  useEffect(() => {
    load(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber, userId]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (
        e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 300
      ) {
        if (loadAble && !isLoading) {
          setPageNumber((prev) => prev + 1);
        }
      }
    };

    const scrollableDiv = scroll.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadAble, isLoading]);

  return (
    <div
      className={`w-full flex-1 space-y-5 overflow-x-hidden ${
        userId === undefined ? "overflow-y-scroll " : ""
      }`}
      id="scrollableDivRef"
      ref={scroll}
    >
      {posts.map((post, index) => (
        <div key={index} className="w-full h-auto bg-glass p-4 flex flex-col">
          <PostBox post={post} loadMethod={reload}></PostBox>
        </div>
      ))}
      {isLoading && (
        <div className=" flex-1 text-6xl text-white animate-spin flex justify-center items-center">
          <RiLoader4Line />
        </div>
      )}
    </div>
  );
};

export default NewPostBox;
