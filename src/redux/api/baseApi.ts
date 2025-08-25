import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/api" }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
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
})
    ,
    createBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation, useGetUniqueBooksQuery, useUpdateBookMutation } = baseApi;
