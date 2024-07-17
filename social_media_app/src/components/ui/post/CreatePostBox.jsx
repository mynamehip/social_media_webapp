import React, { useContext, useEffect, useRef, useState } from "react";
import { Slide, toast } from "react-toastify";

import Button from "../../base/Button";

import { IoMdPhotos, IoMdCloseCircle } from "react-icons/io";
import { createPost } from "../../../actions/postAction";
import { UserContext } from "../../../layouts/Home";

const CreatePostBox = (props) => {
  const descRef = useRef();
  const imageRef = useRef();

  const [textRow, setTextRow] = useState(6);
  const [image, setImage] = useState();

  const user = useContext(UserContext);

  const onUploadImage = (e) => {
    setTextRow(3);
    setImage(e.target.files[0]);
  };
  const onRemoveImage = () => {
    setImage(null);
    setTextRow(6);
    imageRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleSubmit = async (e) => {
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
        toast.success("Create successed!", {
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
      } else {
        console.log("Post created failed:", response.error);
      }
    } catch (error) {
      console.error("Error creating post:", error.response || error);
    }
  };

  return (
    <div className=" fixed top-0 left-0 w-screen h-screen z-50 bg-[#00000080]">
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white lg:w-1/2 md:w-4/5 w-[90%] min-h-[100px] rounded-xl">
        <div className=" text-center text-xl font-bold py-3 grid grid-cols-3">
          <p className=" col-start-2"> Create new post</p>
          <div className=" flex justify-end items-center text-2xl pr-4 text-gray-500">
            <IoMdCloseCircle
              onClick={props.handleOpenNewPost}
            ></IoMdCloseCircle>
          </div>
        </div>
        <hr className=" border-gray-500" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center px-4 pt-4"
        >
          <textarea
            name=""
            id=""
            className=" w-full border rounded-lg border-gray-500 p-3 focus:outline-none"
            placeholder="Write somethings..."
            ref={descRef}
            rows={textRow}
          ></textarea>
          <div className="imgDisplay">
            {image && (
              <div className=" relative">
                {" "}
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className=" w-[100%] max-h-80 object-cover mt-4 rounded-xl"
                ></img>
                <div className=" text-2xl text-white absolute top-2 right-2">
                  <IoMdCloseCircle onClick={onRemoveImage}></IoMdCloseCircle>
                </div>
              </div>
            )}
          </div>
          <div className="postOption w-full text-4xl text-green-500 my-4 flex gap-3">
            <IoMdPhotos onClick={() => imageRef.current.click()}></IoMdPhotos>
            <div className=" text-xs flex-1">
              <Button fill css="w-full">
                Share
              </Button>
            </div>
          </div>
          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onUploadImage} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostBox;
