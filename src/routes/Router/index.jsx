import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Plan from "../alumno/Plan";
import Index from "../Index";
import Login from "../Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/alumno/plan",
    element: <Plan />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
