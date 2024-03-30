import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the ReEx slice
const initialState = {
    listReEx: [
        {
            id: 1,
            title: 'Salary',
            description: 'Monthly salary for March',
            date: '2024-03-01',
            type: 'income',
            amount: 3000
        },
        {
            id: 2,
            title: 'Groceries',
            description: 'Weekly groceries',
            date: '2024-03-03',
            type: 'expense',
            amount: 150
        },
        {
            id: 3,
            title: 'Electricity Bill',
            description: 'Monthly electricity bill',
            date: '2024-03-05',
            type: 'expense',
            amount: 100
        },
        {
            id: 4,
            title: 'Gym Membership',
            description: 'Annual gym membership fee',
            date: '2024-03-10',
            type: 'expense',
            amount: 400
        },
        {
            id: 5,
            title: 'Freelance Project',
            description: 'Payment received for freelance project',
            date: '2024-03-15',
            type: 'income',
            amount: 1200
        }
    ],
    searchResults: [],
    totalIncome: 4200,
    totalExpense: 650,
};

const ReExSlice = createSlice({
    name: "ReEx",
    initialState,
    reducers: {
        // Add a new transaction
        addReEx: (state, action) => {
            state.listReEx.push(action.payload);
            // Recalculate totals
            if (action.payload.type === 'income') {
                state.totalIncome += action.payload.amount;
            } else {
                state.totalExpense += action.payload.amount;
            }
        },
        // Delete a transaction
        deleteReEx: (state, action) => {
            const transactionToDelete = state.listReEx.find(reex => reex.id === action.payload);
            if (transactionToDelete) {
                // Recalculate totals
                if (transactionToDelete.type === 'income') {
                    state.totalIncome -= transactionToDelete.amount;
                } else {
                    state.totalExpense -= transactionToDelete.amount;
                }
            }
            state.listReEx = state.listReEx.filter(reex => reex.id !== action.payload);
        },
        // Update a transaction
        updateReEx: (state, action) => {
            state.listReEx = state.listReEx.map(reex => {
                if (reex.id === action.payload.id) {
                    // Recalculate totals if the amount or type has changed
                    if (reex.amount !== action.payload.amount || reex.type !== action.payload.type) {
                        if (reex.type === 'income') {
                            state.totalIncome -= reex.amount;
                        } else {
                            state.totalExpense -= reex.amount;
                        }
                        if (action.payload.type === 'income') {
                            state.totalIncome += action.payload.amount;
                        } else {
                            state.totalExpense += action.payload.amount;
                        }
                    }
                    return { ...reex, ...action.payload };
                }
                return reex;
            });
        },
        // Search for transactions by title
        searchReEx: (state, action) => {
            state.searchResults = state.listReEx.filter(reex =>
                reex.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        // Reset search results
        resetSearch: (state) => {
            state.searchResults = [];
        }
    }
});

// Export the actions
export const { addReEx, deleteReEx, updateReEx, searchReEx, resetSearch } = ReExSlice.actions;

// Export the reducer
export default ReExSlice.reducer;