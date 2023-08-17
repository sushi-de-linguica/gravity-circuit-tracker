import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TrackerManagerPage } from "./pages/tracker-manager";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { TrackerViewPage } from "./pages/tracker-view";

const router = createHashRouter([
  {
    path: "/:userId/",
    element: <TrackerViewPage />,
  },
  {
    path: "/:userId/view",
    element: <TrackerViewPage />,
  },
  {
    path: "/:userId/manager",
    element: <TrackerManagerPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
