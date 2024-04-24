import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { Home } from "./pages/app/home";
import { Asset } from "./pages/app/assets";
import { Sensors } from "./pages/app/sensors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/asset/:assetName/:assetId", element: <Asset /> },
      {
        path: "/:assetName/:assetId/sensors/:sensorName/:sensorId",
        element: <Sensors />,
      },
    ],
  },
]);
