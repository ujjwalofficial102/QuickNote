import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToNotes, updateToNotes } from "../app/noteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useState(useParams());
  const noteId = searchParams;

  const notes = useSelector((state) => state.note.notes);
  useEffect(() => {
    if (noteId.id) {
      const note = notes.find((pas) => pas._id === noteId.id);
      setTitle(note.title);
      setValue(note.content);
    }
  }, [noteId.id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClickHandler() {
    const note = {
      title: title,
      content: value,
      _id: noteId.id || nanoid(),
    };
    if (noteId.id) {
      //update
      dispatch(updateToNotes(note));
      navigate("/");
    } else {
      //create
      dispatch(addToNotes(note));
    }

    //after creation
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div className="w-120">
      <div className="text-xl font-bold">Make Notes</div>
      <div className="my-4 focus-within:outline focus-within:outline-blue-600 focus-within:ring-2 focus-within:ring-blue-600 rounded-md">
        <input
          className="bg-[#161616] rounded-l-md p-2 w-95 focus:outline-none"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          onClick={onClickHandler}
          className="bg-blue-800  w-25 cursor-pointer px-4 py-2 hover:bg-blue-900 rounded-r-md"
        >
          {noteId.id ? "Update" : "Create"}
        </button>
      </div>

      <div>
        <div className="flex justify-between px-3 items-center bg-gray-900 w-full h-8 rounded-t-lg">
          <div className="flex space-x-2 items-center justify-center">
            <div className="bg-red-700 hover:bg-red-500 h-3 w-3 rounded-full"></div>
            <div className="bg-yellow-700 hover:bg-yellow-500 h-3 w-3 rounded-full"></div>
            <div className="bg-green-700 hover:bg-green-500 h-3 w-3 rounded-full"></div>
          </div>
          <div>
            <button
              onClick={() => {
                if (value) {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied");
                }
              }}
              className="hover:text-gray-500 text-sm font-medium cursor-pointer text-gray-400"
            >
              copy
            </button>
          </div>
        </div>
        <textarea
          className="bg-[#161616] resize-none w-full p-2 rounded-b-lg h-100 focus:outline-none"
          name="content"
          value={value}
          placeholder="Enter Content here..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
