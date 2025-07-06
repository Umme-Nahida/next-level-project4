import BorrowTable from "@/components/borrow/BorrowTable";
import { useGetBorrowQuery } from "@/features/api/baseApi";

const BorrowSummery = () => {

    const {data} = useGetBorrowQuery(undefined)
    console.log(data)
    return (
        <div className="my-5 lg:my-10">
            <BorrowTable data={data?.data}></BorrowTable>
        </div>
    );
};

export default BorrowSummery;