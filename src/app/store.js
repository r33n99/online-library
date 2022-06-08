import { configureStore } from '@reduxjs/toolkit';
import booksliceReducer from "../features/books/booksDataSlice"
import sortSliceReducer from "../features/sort/sortSlice"
import favoriteSliceReducer from "../features/favorites/favoritesSlise"

export const store = configureStore({
  reducer: {
    books: booksliceReducer,
    sort: sortSliceReducer,
    favorite: favoriteSliceReducer,
  },
});
