import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import ViewNotes from "./components/ViewNote";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";

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
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/viewnotes/:id",
        element: <ViewNotes />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
