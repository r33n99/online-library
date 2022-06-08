import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,

    reducers: {
        setFavoriteBookAction(state, action) {
            state.favorites = action.payload; // set the new favorites
            if (state.favorites) {
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
            }
        },
        deleteFavoritesBookAction(state, action) {
            const newFavorites = state.favorites.filter((item) => item !== action.payload); // remove the book from the favorites
            state.favorites = newFavorites;
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        },
    },
});

export const selectFavorites = (state) => state.favorite;

export const { setFavoriteBookAction, deleteFavoritesBookAction } = favoriteSlice.actions;

export default favoriteSlice.reducer;
