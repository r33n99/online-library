import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : [],
  loading: false,
  favorites: localStorage.getItem("favoritesBooks") ? JSON.parse(localStorage.getItem("favoritesBooks")) : [],
  category: ["Все","По названию","По автору","По жанру"],
  status: "idle",
};

export const getDataBooks = createAsyncThunk("books/BooksData", async () => {
  const response = await axios.get(
    "https://6149965f07549f001755a467.mockapi.io/books"
  );
  localStorage.setItem("books", JSON.stringify(response.data));
  return response.data;
});

export const bookSlice = createSlice({
  name: "book",
  initialState,

  reducers: {
    setFavoriteBookAction(state, action) {
      state.favorites = action.payload;
    },
    deleteBookAction(state, action) {
      const newBooks = state.books.filter((item) => item.id !== action.payload);
      state.books = newBooks
      localStorage.setItem("books", JSON.stringify(newBooks));
    },
    deleteFavoritesBookAction(state, action) {
      const newFavorites = state.favorites.filter((item) => item !== action.payload);
      state.favorites = newFavorites
      localStorage.setItem("favoritesBooks", JSON.stringify(newFavorites));
    },
    addBookAction(state, action) {
      state.books.push(action.payload);
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    editBookAction(state, action) {
      const newBooks = state.books.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      state.books = newBooks;
      localStorage.setItem("books", JSON.stringify(newBooks));
    }
  },

  extraReducers: {
    [getDataBooks.pending]: (state) => {
      state.loading = true;
    },
    [getDataBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.loading = false;
    },
    [getDataBooks.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { setFavoriteBookAction,deleteBookAction,deleteFavoritesBookAction,addBookAction,editBookAction } = bookSlice.actions;

export default bookSlice.reducer;
