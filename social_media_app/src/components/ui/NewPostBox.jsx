import React, { useState, useEffect, useRef } from "react";

import { getAllPost, getPostByUser } from "../../actions/postAction";
import PostBox from "./PostBox";

const NewPostBox = ({ userId }) => {
  const scrollDiv = useRef();

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

  useEffect(() => {
    load(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

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

  return (
    <div
      className={`w-full flex-1 space-y-5 ${
        userId === undefined ? "overflow-y-scroll " : ""
      }`}
      id="scrollableDivRef"
      ref={scrollDiv}
    >
      {posts.map((post, index) => (
        <div key={index} className="w-full h-auto bg-glass p-4 flex flex-col">
          <PostBox post={post}></PostBox>
        </div>
      ))}
    </div>
  );
};

export default NewPostBox;
