import { Dialog ,  
    DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { IBook } from "@/types/bookTypes";
import { useAddBorrowMutation } from "@/features/api/baseApi";
import toast from "react-hot-toast";


interface IProps {
  book: IBook
}

export default function BorrowModal({ book }: IProps) {
  const [open,setOpen] = useState(false)
  const [addBorrow, {data}] = useAddBorrowMutation()
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState<Date>();

 

  const handleBorrow = async() => {
    const borrowInfo = {
      book: book._id,
      quantity,
      dueDate: date,
    };

      try {
            const res = await addBorrow(borrowInfo)
            if (res.data.success) {
                toast.success("Book borrowed successfully!");
                setOpen(false)

            }else if(res.error) {
                toast.error(res.error.data.message)
            }
        } catch (err: any) {
            toast.error(err?.data?.errorResponse?.errmsg || "Error adding borrow.");
        }
  };

  if (book.copies === 0) {
    return (
      <Button variant="outline" disabled>
        Unavailable
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-white text-right px-4 py-2 rounded-md text-sm hover:bg-green-700 transition cursor-pointer" variant="default">Borrow Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Borrow "{book.title}"</DialogTitle>
          <DialogDescription>Fill in the details to borrow this book.</DialogDescription>
        </DialogHeader>

        {/* Borrow Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Borrow Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={book.copies}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <p className="text-sm text-gray-500">Available Copies: {book.copies}</p>
        </div>

        {/* Due Date Picker */}
        <div className="space-y-2 pt-4">
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {date ? format(date, "PPP") : <span>Select due date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleBorrow} disabled={!date || quantity < 1}>
            Confirm Borrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
