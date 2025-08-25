import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/api" }),
  tagTypes: ["Books"],  
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags:['Books']
    }),
    
    getUniqueBooks: builder.query({
      query: (id) => `/books/${id}`,
    }),

    updateBook: builder.mutation({
      query: ({ id, body }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags:['Books']
    })
    ,
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['Books']
    }),
    createBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags:['Books']
    }),
    borrowBook: builder.mutation({
      query: (book) => ({
        url: '/borrow',
        method: "POST",
        body: book
      }),
      invalidatesTags:['Books']
    }),
    getBorrowedBooks: builder.query({
      query: () => '/borrow',
      providesTags: ['Books']
    })
  }),

});

export const { useGetBooksQuery, useCreateBookMutation, useGetUniqueBooksQuery, useUpdateBookMutation,useDeleteBookMutation,useBorrowBookMutation, useGetBorrowedBooksQuery } = baseApi;
