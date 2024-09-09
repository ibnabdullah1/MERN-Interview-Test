import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CreateDrawing from "../pages/CreateDrawing/CreateDrawing";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-drawing",
        element: <CreateDrawing />,
      },
    ],
  },
]);

export default router;
