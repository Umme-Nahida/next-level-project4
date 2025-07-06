import type { IBook } from "@/types/bookTypes";
import UpdateModals from "./UpdateModals";
import DeleteBookModal from "./DeleteBookModal";
import BorrowModal from "../borrow/BorrowModal";

interface IProp{
    book: IBook
}

export default function BookCard({ book }: IProp) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-md mx-auto my-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
          <p className="text-sm text-gray-600">Author: {book.author}</p>
          <p className="text-sm text-gray-600">Genre: {book.genre}</p>
          <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
          <p className="text-sm text-gray-600">
            Copies Available: {book.copies}
          </p>
        </div>

        {/* Action Icons */}
        <div className="flex space-x-3">

          {/* update a book modal */}
          <UpdateModals book={book}></UpdateModals>

         <DeleteBookModal book={book}></DeleteBookModal>
        </div>
      </div>

      {/* Borrow Button */}
      <div className="flex items-center justify-between">
        {
          book?.copies=== 0 && 
          <p className="text-red-600 font-bold">Unavailable book</p>

        }
         
        <BorrowModal book={book}></BorrowModal>
      </div>
    </div>
  );
}
