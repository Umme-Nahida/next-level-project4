import AddBookModal from "@/components/books/AddBookModal";
import BookCard from "@/components/books/BookCard";
import BookPagination from "@/components/books/BookPagination";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetBooksQuery } from "@/features/api/baseApi";
import type { IBook } from "@/types/bookTypes";
import { useState } from "react";

const AllBooks = () => {
    const [page, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
    const limit = 5;

    const { data, isLoading } = useGetBooksQuery({ page, limit, filter: selectedGenre });
    const books = data?.data || [];
    const meta = data?.meta;

    if(isLoading){
        return <div className="flex items-center justify-center min-h-screen">
            ......data is loading
        </div>
    }


    return (
        <div>
            <div>
                <h1 className="text-xl md:text-2xl text-center font-bold my-5">All Books</h1>
                <div className="flex items-start justify-center gap-x-3">
                    <AddBookModal></AddBookModal>
                    <Select onValueChange={(value) => setSelectedGenre(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Genre</SelectLabel>
                                <SelectItem value="FANTASY">FANTASY</SelectItem>
                                <SelectItem value="FICTION">FICTION</SelectItem>
                                <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                <SelectItem value="HISTORY">HISTORY</SelectItem>
                                <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {selectedGenre && (
                        <Button 
                            onClick={() => setSelectedGenre(undefined)}
                            className="text-sm cursor-pointer ml-4"
                        >Clear Filter</Button>
                    )}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-items-center">
                    {
                        books?.map((book: IBook, inx: any) => (
                            <BookCard key={inx} book={book}></BookCard>
                        ))
                    }
                </div>
            </div>

            {/* added pagination here */}
            <div className="my-5">
                <BookPagination
                    limit={meta?.limit}
                    page={meta?.page}
                    total={meta?.total}
                    onPageChange={(newPage) => setPage(newPage)}
                ></BookPagination>
            </div>
        </div>
    );
};

export default AllBooks;