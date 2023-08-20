import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TrackerManagerPage } from "./pages/tracker-manager";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { TrackerViewPage } from "./pages/view";
import { ViewBossesPage } from "./pages/view/view-bosses";
import { ViewEnemiesPage } from "./pages/view/view-enemies";
import { ViewCharactersPage } from "./pages/view/view-characters";

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
    path: "/:userId/bosses",
    element: <ViewBossesPage />,
  },
  {
    path: "/:userId/characters",
    element: <ViewCharactersPage />,
  },
  {
    path: "/:userId/enemies",
    element: <ViewEnemiesPage />,
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
