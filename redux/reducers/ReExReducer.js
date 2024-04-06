import { createSlice } from '@reduxjs/toolkit';
import {
    fetchData,
    addData,
    updateData,
    deleteData,
    searchData,
    resetSearch,
} from '../action/actions';

// Define the initial state of the ReEx slice
const initialState = {
    listReEx: [],
    searchResults: [],
    totalIncome: 0,
    totalExpense: 0,
    isLoading: false,
    error: null,
};

const dataSlide = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending(), (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                let totalIncome = 0;
                let totalExpense = 0;
                action.payload.forEach(item => {
                    if (item.type === 'income') {
                        totalIncome += item.amount;
                    } else if (item.type === 'expense') {
                        totalExpense += item.amount;
                    }
                })
                state.isLoading = false;
                state.listReEx = action.payload;
                state.totalIncome = totalIncome;
                state.totalExpense = totalExpense;
                state.error = null;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

        builder
            .addCase(addData.pending(), (state, action) => {
                state.isLoading = true;
            })
            .addCase(addData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listReEx = [...state.listReEx, action.payload];
                state.totalExpense = state.totalExpense + (action.payload.type === 'expense' ? action.payload.amount : 0);
                state.totalIncome = state.totalIncome + (action.payload.type === 'income' ? action.payload.amount : 0);
                state.error = null;
            })
            .addCase(addData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

        builder
            .addCase(updateData.pending(), (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateData.fulfilled, (state, action) => {
                const oldItem = state.listReEx.find(item => item._id === action.payload._id);
                const updatedItem = action.payload;

                state.loading = false;
                state.listReEx = state.listReEx.map(item => item._id === action.payload._id ? action.payload : item);
                state.totalIncome = state.totalIncome - (oldItem.type === 'income' ? oldItem.amount : 0) + (updatedItem.type === 'income' ? updatedItem.amount : 0);
                state.totalExpense = state.totalExpense - (oldItem.type === 'expense' ? oldItem.amount : 0) + (updatedItem.type === 'expense' ? updatedItem.amount : 0);
                state.error = '';
            })
            .addCase(updateData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(deleteData.pending(), (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listReEx = state.listReEx.filter(item => item.id !== action.payload);
                state.totalExpense = state.totalExpense - (action.payload.type === 'expense' ? action.payload.amount : 0);
                state.totalIncome = state.totalIncome - (action.payload.type === 'income' ? action.payload.amount : 0);
                state.error = null;
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(searchData.pending(), (state, action) => {
                state.isLoading = true;
            })
            .addCase(searchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload;
                state.error = null;
            })
            .addCase(searchData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        builder
            .addCase(resetSearch.fulfilled, (state, action) => {
                state.searchResults = [];
            })
            .addCase(resetSearch.rejected, (state, action) => {
                state.searchResults = [];
            })
            .addCase(resetSearch.pending(), (state, action) => {
                state.searchResults = [];
            })

    }

})

export default dataSlide.reducer;