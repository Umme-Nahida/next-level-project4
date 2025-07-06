import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import type { IBook } from "@/types/bookTypes";
import { useDeleteBookMutation } from "@/features/api/baseApi";
import toast from "react-hot-toast";

interface IProps {
    book: IBook
}

const DeleteBookModal = ({ book }: IProps) => {
    const [deleteBook] = useDeleteBookMutation()


    const handleDelete = async () => {
        try {
            const res = await deleteBook(book?._id as string).unwrap();
            if (res.success) {
                toast.success("Book deleted successfully!");
            } else if (res.error) {
                toast.error("Failed to delete the book.")
            }
            
            // optionally: refetch or update state
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete the book.");
        }
    };
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="text-red-500 hover:text-red-700" variant="outline">
                        <Trash2 size={20} />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure to delete?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete your
                            book and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteBookModal;