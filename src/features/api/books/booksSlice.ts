import type { IBook } from "@/types/bookTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    books: IBook[]
}

const initialState: IInitialState = {
    books:[]
}

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<IBook>)=>{
            console.log('action',action)
            state.books.push(action.payload)
        }
    }

})

export default booksSlice.reducer;
export const { addBook} = booksSlice.actions;
export const selectBooks = (state: {books: IInitialState}) => state.books.books;