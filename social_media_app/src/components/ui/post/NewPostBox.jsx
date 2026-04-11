import React, { useState, useEffect, useRef } from "react";

import { getAllPost, getPostByUser } from "../../../actions/postAction";
import PostBox from "../post/PostBox";

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
      className={`w-full flex-1 space-y-6 overflow-x-hidden ${
        userId === undefined ? "overflow-y-auto" : ""
      } no-scrollbar`}
      id="scrollableDivRef"
      ref={scroll}
    >
      {posts.map((post, index) => (
        <div
          key={index}
          className="w-full bg-white border border-gray-200/60 rounded-3xl p-6 shadow-md shadow-gray-200/50 hover:shadow-xl hover:border-primary-100 transition-smooth animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <PostBox post={post} loadMethod={reload} />
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-center p-8">
          <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
      )}

      {!loadAble && posts.length > 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 font-medium text-sm">You've reached the end of the feed.</p>
        </div>
      )}
    </div>
  );
};

export default NewPostBox;
