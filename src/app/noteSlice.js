import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      if (!action.payload.title.trim()) {
        toast.error("couldn't store empty title");
        return;
      }
      state.notes.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Content Created successfully");
    },
    updateToNotes: (state, action) => {
      if (state.notes.length === 0) return;
      state.notes = state.notes.map((note) =>
        note._id === action.payload._id ? { ...action.payload } : note
      );
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Content Updated successfully");
    },
    removeAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem("notes");
      toast.success("All Notes removed successfully");
    },
    removeFromNotes: (state, action) => {
      if (state.notes.length === 0) return;
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload._id
      );
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Deleted successfully");
    },
  },
});

export const { addToNotes, updateToNotes, removeAllNotes, removeFromNotes } =
  noteSlice.actions;

export default noteSlice.reducer;
