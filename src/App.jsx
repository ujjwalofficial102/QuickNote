import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Pastes from "./components/pastes";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pastes",
        element: <Pastes />,
      },
      {
        path: "/viewpastes/:id",
        element: <ViewPaste />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
