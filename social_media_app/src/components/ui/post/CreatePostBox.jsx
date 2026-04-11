import React, { useContext, useEffect, useRef, useState } from "react";
import { Slide, toast } from "react-toastify";
import { TbX, TbPhoto, TbLoader2 } from "react-icons/tb";
import { createPost } from "../../../actions/postAction";
import { UserContext } from "../../../layouts/Home";
import Avatar from "../../base/Avatar";

const CreatePostBox = (props) => {
  const descRef = useRef();
  const imageRef = useRef();

  const [image, setImage] = useState();
  const [isLoading, setLoading] = useState(false);

  const user = useContext(UserContext);

  const onUploadImage = (e) => {
    setImage(e.target.files[0]);
  };
  const onRemoveImage = () => {
    setImage(null);
    imageRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleSubmit = async (e) => {
    if (isLoading) return;
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("content", descRef.current.value);
    formData.append("createdAt", new Date().toISOString());

    if (image) {
      const uniqueFileName = `${Date.now()}_${image.name}`;
      formData.append("image", image, uniqueFileName);
    }

    try {
      const response = await createPost(formData);
      if (response.status === 201) {
        props.handleOpenNewPost();
        props.onCreatePost();
        toast.success("Posted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "colored",
          transition: Slide,
        });
      }
    } catch (error) {
      console.error("Error creating post:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Create Post</h2>
          <button 
            onClick={props.handleOpenNewPost} 
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-smooth"
          >
            <TbX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-50">
              <Avatar avatar={user?.avatar} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">{user?.userName}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Sharing to feed</p>
            </div>
          </div>

          {/* Content Area */}
          <textarea 
            placeholder={`What's on your mind, ${user?.userName?.split(' ')[0]}?`}
            ref={descRef} 
            rows={4}
            className="w-full p-2 text-lg text-gray-700 placeholder:text-gray-300 focus:outline-none resize-none no-scrollbar font-medium"
          />

          {/* Image Preview */}
          {image && (
            <div className="relative rounded-2xl overflow-hidden group border border-gray-100 bg-gray-50">
              <img src={URL.createObjectURL(image)} alt="Upload preview" className="w-full max-h-72 object-cover" />
              <button 
                type="button"
                onClick={onRemoveImage}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-smooth"
              >
                <TbX size={18} />
              </button>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={() => imageRef.current.click()}
              className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-smooth font-bold text-sm"
            >
              <TbPhoto size={22} />
              <span>Photo</span>
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-primary-600/20 active:scale-95 transition-smooth flex items-center gap-2"
            >
              {isLoading && <TbLoader2 className="animate-spin" />}
              {isLoading ? "Posting..." : "Share Post"}
            </button>
          </div>

          <input type="file" ref={imageRef} onChange={onUploadImage} hidden />
        </form>
      </div>
    </div>
  );
};

export default CreatePostBox;
