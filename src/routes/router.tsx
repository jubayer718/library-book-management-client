import Home from "@/components/layout/Home";
import MainLayout from "@/components/layout/MainLayout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home
      }
    ],
  },
]);
export default router;