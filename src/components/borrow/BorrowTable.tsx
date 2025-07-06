import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface IBorrow {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

interface Props {
  data: IBorrow[];
}

const BorrowTable = ({ data }: Props) => {
  return (
    <div className="max-w-[80%] mx-auto overflow-x-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Borrowed Books</h2>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Borrow Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="text-center">Total Quantity</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500 py-6">
                No borrowed books found.
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.book.title}</TableCell>
                <TableCell>{item.book.isbn}</TableCell>
                <TableCell className="text-center">{item.totalQuantity}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowTable;
