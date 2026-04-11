import React, { useContext, useMemo, useState } from "react";
import { Slide, toast } from "react-toastify";
import { TbMessageCircle, TbSend, TbTrash } from "react-icons/tb";

import Avatar from "../../base/Avatar";
import Button from "../../base/Button";
import { UserContext } from "../../../layouts/Home";
import {
  createComment,
  deleteComment,
  getAllComment,
} from "../../../actions/postAction";
import { formatTimeAgo } from "../../../utils/formatDate";

const PAGE_SIZE = 3;

const PostCommentBox = ({ postId, initialCommentCount = 0 }) => {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [commentCount, setCommentCount] = useState(initialCommentCount);

  const canSubmit = useMemo(
    () => Boolean(user?.id) && content.trim().length > 0 && !isLoading,
    [content, isLoading, user?.id]
  );

  const visibleComments = comments.slice(0, visibleCount);
  const hasMoreComments = visibleCount < comments.length;

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const response = await getAllComment(postId);
      setComments(response.data);
      setCommentCount(response.data.length);
      setVisibleCount(PAGE_SIZE);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen && !isLoaded) {
      await loadComments();
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setIsLoading(true);
      const response = await createComment({
        content: content.trim(),
        postId,
        userId: user.id,
      });
      setComments((prev) => [...prev, response.data]);
      setCommentCount((prev) => prev + 1);
      setContent("");
      setIsOpen(true);
      setIsLoaded(true);
      setVisibleCount((prev) => Math.max(prev, PAGE_SIZE));
    } catch (error) {
      toast.error(error?.response?.data || "Cannot create comment", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId, user.id);
      setComments((prev) => prev.filter((item) => item.commentId !== commentId));
      setCommentCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      toast.error(error?.response?.data || "Cannot delete comment", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 w-full">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600 transition-smooth"
        >
          <TbMessageCircle size={18} />
          <span>{commentCount} bÃ¬nh luáº­n</span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {user ? (
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Avatar avatar={user.avatar} />
              </div>
              <div className="flex-1 rounded-2xl border border-gray-100 bg-gray-50 p-3">
                <textarea
                  value={content}
                  rows={2}
                  placeholder="Viáº¿t bÃ¬nh luáº­n cá»§a báº¡n..."
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent resize-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
                <div className="flex justify-end pt-2">
                  <Button
                    fill
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    css="rounded-xl px-4 py-2 flex items-center gap-2"
                  >
                    <TbSend size={16} />
                    {isLoading ? "Äang gá»­i..." : "Gá»­i"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 bg-gray-50 rounded-2xl px-4 py-3 border border-dashed border-gray-200">
              ÄÄƒng nháº­p Ä‘á»ƒ bÃ¬nh luáº­n.
            </div>
          )}

          <div className="space-y-3">
            {isLoading && comments.length === 0 ? (
              <div className="text-sm text-gray-400">Äang táº£i bÃ¬nh luáº­n...</div>
            ) : comments.length === 0 ? (
              <div className="text-sm text-gray-400">ChÆ°a cÃ³ bÃ¬nh luáº­n nÃ o.</div>
            ) : (
              visibleComments.map((comment) => (
                <div
                  key={comment.commentId}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Avatar avatar={comment.avatar} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          {comment.userName}
                        </div>
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider">
                          {formatTimeAgo(comment.createdAt)}
                        </div>
                      </div>
                      {user?.id === comment.userId && (
                        <button
                          onClick={() => handleDelete(comment.commentId)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-smooth"
                          title="XÃ³a bÃ¬nh luáº­n"
                        >
                          <TbTrash size={16} />
                        </button>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap break-words">
                      {comment.content}
                    </div>
                  </div>
                </div>
              ))
            )}

            {hasMoreComments && (
              <button
                onClick={handleLoadMore}
                className="text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors"
              >
                Xem thÃªm bÃ¬nh luáº­n
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCommentBox;
