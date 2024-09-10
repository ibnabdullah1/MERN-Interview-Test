import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CreateDrawing from "../pages/CreateDrawing/CreateDrawing";
import DrawingDetails from "../pages/DrawingDetails/DrawingDetails";
import ExploreDrawings from "../pages/ExploreDrawings/exploreDrawings";
import Home from "../pages/Home/Home";
import UpdateDrawing from "../pages/UpdateDrawing/UpdateDrawing";

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
      {
        path: "/all-drawings",
        element: <ExploreDrawings />,
      },
      {
        path: "/all-drawings/:drawingId",
        element: <DrawingDetails />,
      },
      {
        path: "/update-drawing/:drawingId",
        element: <UpdateDrawing />,
      },
    ],
  },
]);

export default router;
