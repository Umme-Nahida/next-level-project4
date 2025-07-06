import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

interface BookPaginationProps {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
}

export default function BookPagination({ page, limit, total, onPageChange }: BookPaginationProps) {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={() => page > 1 && onPageChange(page - 1)} />
                </PaginationItem>

                
                {[...Array(totalPages)].map((_item, i) => {
                    const pageNumber = i +1; 

                    return (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === pageNumber}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}


                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={() => page < totalPages && onPageChange(page + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
