import App from "@/App";
import AddBooks from "@/pages/books/AddBookForm";
import AllBooks from "@/pages/books/AllBooks";
import BorrowSummery from "@/pages/borrow/BorrowSummery";
import {
  createBrowserRouter
} from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
       {
            index: true,
            Component: AllBooks
        },
       {
            path: "/books",
            Component: AllBooks
        },
        {
            path: "/addBook",
            Component: AddBooks
        },
        {
            path: "/borrowSummery",
            Component: BorrowSummery
        },
       
    ]
  },
]);

export default router;




