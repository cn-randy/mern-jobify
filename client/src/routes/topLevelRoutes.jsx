import { createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  Error,
} from "../pages/index.jsx";
import { action as registerAction } from "../pages/Register.jsx";
import { action as loginAction } from "../pages/Login.jsx";
import { queryClient } from "../utils/queryClient.js";

export const topLevelRoutes = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
    ],
  },
];
