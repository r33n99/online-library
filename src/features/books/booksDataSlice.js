import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    books:  [],
    loading: false,
    status: 'idle',
    selectedSort: null,
    searchTerm: 'frontend',
};

export const getDataBooks = createAsyncThunk('books/BooksData', async (query) => {
    // const sort = sortProperty ? `&orderBy=${sortProperty}` : '';
    const { data: {items} } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    return items;
});

export const bookSlice = createSlice({
    name: 'book',
    initialState,

    reducers: {
        deleteBookAction(state, action) {
            const newBooks = state.books.filter((item) => item.id !== action.payload); // проверяем на совпадение id книги
            state.books = newBooks;
            // localStorage.setItem('books', JSON.stringify(newBooks));
        },
        addBookAction(state, action) {
            // добавление книги
            const { data, id } = action.payload;
            const newBooks = [...state.books, { ...data, id }];
            state.books = newBooks;
            // localStorage.setItem('books', JSON.stringify(state.books));
        },
        editBookAction(state, action) {
            const newBooks = state.books.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            state.books = newBooks;
            // localStorage.setItem('books', JSON.stringify(newBooks));
        },
        setSearchTermAction(state, action) {
            state.searchTerm = action.payload;
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
            state.status = 'error';
        },
    },
});

export const selectBooks = (state) => state.books;

export const { deleteBookAction, addBookAction, editBookAction,setSearchTermAction } = bookSlice.actions;

export default bookSlice.reducer;
