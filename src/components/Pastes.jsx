import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeAllPastes, removeFromPastes } from "../app/pasteSlice";
import toast from "react-hot-toast";

const Pastes = () => {
  const [search, setSearch] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="mb-2 text-xl font-bold">My Notes</div>
      <input
        className="bg-black rounded-md p-2 px-4 w-full mb-2 focus:outline focus:outline-blue-800 focus:ring-2 focus:ring-blue-800"
        type="search"
        placeholder="Search here..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="bg-[#151515] border border-gray-500 rounded-lg w-120 p-4">
        <ul className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <li
                key={paste._id}
                className="flex justify-between items-center border border-gray-500 p-4 rounded-lg"
              >
                <Link
                  to={`/viewpastes/${paste._id}`}
                  className="text-white text-start"
                  title="edit"
                >
                  <div>{paste.title}</div>
                  <div className="font-normal text-xs truncate w-50">
                    {paste.content}
                  </div>
                </Link>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.origin + `/viewpastes/${paste._id}`
                      );
                      toast.success("URL copied to clipboard");
                    }}
                    className="cursor-pointer bg-green-700 py-1 px-3 rounded hover:bg-green-800"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Content Copied to clipboard");
                    }}
                    className="cursor-pointer bg-blue-700 py-1 px-3 rounded hover:bg-blue-800"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      dispatch(removeFromPastes(paste));
                    }}
                    className="cursor-pointer bg-red-700 py-1 px-2 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <Link to={"/"}>Empty! Create Now</Link>
          )}
        </ul>
      </div>
      {filteredData.length > 0 ? (
        <button
          onClick={() => {
            dispatch(removeAllPastes());
          }}
          className="cursor-pointer mt-2 bg-red-700 py-1 px-4 rounded hover:bg-red-800"
        >
          Delete All
        </button>
      ) : null}
    </div>
  );
};

export default Pastes;
