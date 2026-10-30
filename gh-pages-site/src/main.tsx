import "./styles.css";
import { createRoot } from "react-dom/client";
import { createRouter, createHashHistory, RouterProvider } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { Route as home } from "./index";
import { Route as movie } from "./movie";
const router = createRouter({ routeTree: rootRoute.addChildren([home, movie]), history: createHashHistory() });
createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
