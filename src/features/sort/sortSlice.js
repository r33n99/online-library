import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sort: {
        name: 'имени',
        sortProperty: 'name',
    },
};

export const sortSlice = createSlice({
    name: 'sort',
    initialState,

    reducers: {
        setFilters(state, action) {
            if (Object.keys(action.payload).length) {
                state.sort = action.payload;
            } else {
                state.sort = {
                    name: 'имени',
                    sortProperty: 'name',
                };
            }
        },
    },
});

export const selectSort = (state) => state.sort;

export const { setFilters } = sortSlice.actions;

export default sortSlice.reducer;
