import { configureStore } from '@reduxjs/toolkit';
import booksliceReducer from "../features/books/booksDataSlice"
export const store = configureStore({
  reducer: {
    books: booksliceReducer,
  },
});
