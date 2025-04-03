import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      if (!action.payload.title.trim()) {
        toast.error("couldn't store empty title");
        return;
      }
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Content Created successfully");
    },
    updateToPastes: (state, action) => {
      if (state.pastes.length === 0) return;
      state.pastes = state.pastes.map((paste) =>
        paste._id === action.payload._id ? { ...action.payload } : paste
      );
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Content Updated successfully");
    },
    removeAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All Notes removed successfully");
    },
    removeFromPastes: (state, action) => {
      if (state.pastes.length === 0) return;
      state.pastes = state.pastes.filter(
        (paste) => paste._id !== action.payload._id
      );
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Deleted successfully");
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  removeAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
