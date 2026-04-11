import React, { useContext, useState } from "react";
import { toast, Slide } from "react-toastify";

import Avatar from "../../base/Avatar";
import VoteBox from "./VoteBox";
import PostCommentBox from "./PostCommentBox";
import { FaCircleXmark } from "react-icons/fa6";
import { UserContext } from "../../../layouts/Home";
import ConfrimDialog from "../option/ConfrimDialog";

import { hostURL } from "../../../api";
import { deletePost } from "../../../actions/postAction";
import { formatTimeAgo } from "../../../utils/formatDate";

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
    <article className="group">
      {isOpenDialog && (
        <ConfrimDialog
          header={"Delete Post"}
          message={"This action cannot be undone. Are you sure?"}
          actionMethod={handleDeletePost}
          cancelMethod={handleOpenDialog}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-gray-50 group-hover:ring-primary-100 transition-smooth">
            <Avatar avatar={post.avatar} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight hover:underline transition-all">
              {post.userName}
            </span>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              {formatTimeAgo(post.createdAt || post.timestamp || post.postAt)}
            </span>
          </div>
        </div>

        {user?.id === post.userId && (
          <button
            onClick={handleOpenDialog}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-smooth opacity-0 group-hover:opacity-100"
          >
            <FaCircleXmark size={18} />
          </button>
        )}
      </div>

      <div className="text-[15px] text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
        {handleContent(post.content)}
      </div>

      {post.imagePath && (
        <div className="mb-4 rounded-2xl overflow-hidden border border-gray-50 bg-gray-50">
          <img
            src={hostURL + "/Images/" + post.imagePath}
            alt="Post content"
            className="w-full max-h-[500px] object-cover hover:scale-[1.01] transition-smooth cursor-pointer"
          />
        </div>
      )}

      <div className="pt-2 border-t border-gray-50 space-y-4">
        <div className="flex items-center">
          <VoteBox post={post} />
        </div>
        <PostCommentBox postId={post.postId} initialCommentCount={post.commentCount} />
      </div>
    </article>
  );
};

export default PostBox;
