import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books:[],
}

export const booksSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    // createBook: (state, action) => {
      
    // }
  },
});

// export const { createBook } = booksSlice.actions;
export default booksSlice.reducer;
