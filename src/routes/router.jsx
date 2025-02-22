import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../DisplayLayout/HomeLayout";
import Errorpage from "../pages/Errorpage";
import Signin from "../Authentication/Signin";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Authentication/Register";
import ForgotPassword from "../Authentication/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import AddTask from "../pages/AddTask";
import TaskManage from "../pages/TaskManage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Errorpage />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
    errorElement: <Errorpage />,
  },
  {
    path: "/add-Task",
    element: (
      <PrivateRoute>
        <AddTask></AddTask>
      </PrivateRoute>
    ),
    errorElement: <Errorpage />,
  },
  {
    path: "/task-manage",
    element: (
      <PrivateRoute>
        <TaskManage></TaskManage>
      </PrivateRoute>
    ),
    errorElement: <Errorpage />,
  },
  // {
  //   path: "/liked-artifacts",
  //   element: (
  //     <PrivateRoute>
  //       <LikedArtifact />
  //     </PrivateRoute>  
  //   ),
  //   loader:()=>fetch(`https://historical-artifacts-tracker-server-blue.vercel.app/likeddata`),
  //   errorElement: <Errorpage />,
  // },
  // {
  //   path: "/update-artifact/:id",
  //   element:(
  //     <PrivateRoute>
  //       <UpdateArtifact></UpdateArtifact>
  //     </PrivateRoute>
  //   )
  // },
  // {
  //   path: "/my-artifacts",
  //   element: (
  //     <PrivateRoute>
  //       <MyArtifact />
  //     </PrivateRoute>
  //   ),
    
  //   errorElement: <Errorpage />,
  // },
  // {
  //   path: "/profile",
  //   element: (
  //     <PrivateRoute>
  //       <Profile />
  //     </PrivateRoute>
  //   ),
  //   errorElement: <Errorpage />,
  // },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "login",
        element: <Signin />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
