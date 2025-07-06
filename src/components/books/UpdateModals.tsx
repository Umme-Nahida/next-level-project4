import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUpdateBookMutation } from "@/features/api/baseApi";
import toast from "react-hot-toast";
import type { IBook } from "@/types/bookTypes";

interface IProps{
    book: IBook
}

const UpdateModals = ({book}: IProps) => {

        const [updateBook, {isError}] = useUpdateBookMutation();
        const [open, setOpen] = useState(false);
        const navigate = useNavigate();
    
    
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            const form = e.currentTarget as any;
            const title = form.title.value;
            const author = form.author.value;
            const genre = form.genre.value;
            const isbn = form.isbn.value;
            const description = form.description.value;
            const copies = parseInt(form.copies.value);
            const available = form.available.checked;
    
            const updateInfo = { title, author, genre, isbn, description, copies, available };
            // console.log(updateInfo)

            // console.log('updated id', book._id)
            
    
             try {
                 const res = await updateBook({id:book?._id, body: updateInfo}).unwrap();
                  console.log('res',res)
                 if (res.success) {
                     toast.success("Book updated successfully!");
                     navigate('/books')
                     setOpen(false);
    
    
                 }else if(res.error || isError) {
                     const { errors } = res.error;
                     toast.error(errors.errorResponse?.errmsg)
                 }
             } catch (err: any) {
                 toast.error(err?.data?.errorResponse?.errmsg || "Error adding book.");
             }
        };
    
    


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="text-green-500 hover:text-green-700 cursor-pointer" variant="outline">
                        <Pencil size={20} />
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl p-6">
                    <DialogTitle className="text-2xl font-bold text-center text-gray-800 mb-2">
                        Edit A Book
                    </DialogTitle>
                    <DialogDescription className="text-center mb-4">
                        Fill out the form below to update a book.
                    </DialogDescription>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter book title"
                                defaultValue={book?.title}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input
                                type="text"
                                name="author"
                                defaultValue={book?.author}
                                placeholder="Enter author name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Genre Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                            <select
                                name="genre"
                                defaultValue={book?.genre}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            >
                                <option value="">Select Genre</option>
                                <option value="FICTION">Fiction</option>
                                <option value="NON_FICTION">Non-fiction</option>
                                <option value="SCIENCE">Science</option>
                                <option value="HISTORY">History</option>
                                <option value="BIOGRAPHY">Biography</option>
                                <option value="FANTASY">Fantasy</option>
                            </select>
                        </div>

                        {/* ISBN */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                defaultValue={book?.isbn}
                                placeholder="Enter ISBN number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                defaultValue={book?.description}
                                rows={4}
                                placeholder="Write a brief description..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            ></textarea>
                        </div>

                        {/* Copies */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Copies</label>
                            <input
                                type="number"
                                name="copies"
                                defaultValue={book?.copies}
                                min="1"
                                placeholder="Number of copies"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Available Checkbox */}
                        <div className="flex items-center space-x-2 pt-6">
                            <input
                                id="available"
                                name="available"
                                type="checkbox"
                                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                defaultChecked
                            />
                            <label htmlFor="available" className="text-gray-700 font-medium">
                                Available
                            </label>
                        </div>

                        {/* Footer buttons */}
                        <DialogFooter className="md:col-span-2 mt-4 flex justify-between">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateModals;