import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-8">
      <div className="flex gap-4 justify-between">
        <div className="text-2xl font-medium">QuickNotes</div>
        <div className="space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-[#535bf2]" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? "text-[#535bf2]" : "")}
          >
            My Notes
          </NavLink>
        </div>
      </div>
      <hr className="text-slate-700 mt-4 mb-6 w-full" />
      <Outlet />
    </div>
  );
};

export default Navbar;
