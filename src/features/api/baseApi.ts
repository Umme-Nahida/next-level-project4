import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://assignment3-gamma-wheat.vercel.app/api" }),
    tagTypes: ['book','borrow'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({ page, limit, filter, sortBy, sort }) => {
                let queryStr = `/books?page=${page}&limit=${limit}`;
                if (filter) queryStr += `&filter=${filter}`;
                if (sortBy) queryStr += `&sortBy=${sortBy}&sort=${sort}`;
                return queryStr;
            },
        }),

        createBook: builder.mutation({
            query: (book) => ({
                url: "/books",
                method: "POST",
                body: book
            }),
            invalidatesTags: ["book"]
        }),

        updateBook: builder.mutation({
            query: ({ id, body }) => ({
                url: `books/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["book"]
        }),

        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["book"]
        }),




        // borrow api start here
        getBorrow: builder.query({
            query: () => "/borrow",
            providesTags: ["borrow"],
        }),

        addBorrow: builder.mutation({
            query: (borrowData) => ({
                url: "/borrow",
                method: "POST",
                body: borrowData
            }),
            invalidatesTags: ["borrow"]
        }),


    })
})

export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useGetBorrowQuery, useAddBorrowMutation } = baseApi;