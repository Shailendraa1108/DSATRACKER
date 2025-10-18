import React, { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import HeaderPage from "./Components/Headerpage";
import SubjectsTopics from "./pages/SubjectsTopics";
import TopicPage from "./pages/TopicPage";
import Register from "./Auth/Register";
import Login from "./Auth/Login";


// Create Context
export const MyContext = createContext();

// Alert function for toast notifications
const alertBox = (msg, type) => {
  if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
};

export default function App() {
  const values = {
    alertBox,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HeaderPage />
    },
     {
    path: "/subjects",      // Subjects page
    element: <SubjectsTopics/>
  },
     {
    path: "/login",      // Subjects page
    element: <Login/>
  },
     {
    path: "/register",      // Subjects page
    element: <Register/>
  },

  {
    path: "/topics/:id",    // Topics page (dynamic route)
    element: <TopicPage />
  },
  ]);

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </MyContext.Provider>
    </>
  );
}
