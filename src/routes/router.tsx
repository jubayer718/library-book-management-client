import AllBooks from "@/components/layout/Pages/AllBooks";
import MainLayout from "@/components/layout/MainLayout";
import { createBrowserRouter } from "react-router";
import CreateBooks from "@/components/layout/Pages/CreateBooks";
import BorrowSummary from "@/components/layout/Pages/BorrowSummary";
import ViewBook from "@/components/layout/Pages/ViewBook";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: AllBooks
      },
      {
        path: "/createbook",
        Component: CreateBooks
      }, {
        path: "/summary",
        Component: BorrowSummary
      }, {
        path: "/viewBook/:id",
        Component: ViewBook 
      }
    ],
  },
]);
export default router;