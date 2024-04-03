import { createSlice } from '@reduxjs/toolkit';
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    ADD_DATA_FAILURE,
    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAILURE,
    DELETE_DATA_REQUEST,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_FAILURE,
    SEARCH_DATA_REQUEST,
    SEARCH_DATA_SUCCESS,
    SEARCH_DATA_FAILURE,
    RESET_SEARCH,
} from '../action/actions';

// Define the initial state of the ReEx slice
const initialState = {
    listReEx: [],
    searchResults: [],
    totalIncome: 0,
    totalExpense: 0,
};

const dataReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DATA_SUCCESS:
            let totalIncome = 0;
            let totalExpense = 0;
            action.payload.forEach(item => {
                if (item.type === 'income') {
                    totalIncome += item.amount;
                } else if (item.type === 'expense') {
                    totalExpense += item.amount;
                }
            });
            return {
                ...state,
                loading: false,
                listReEx: action.payload,
                totalIncome,
                totalExpense,
                error: '',
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                listReEx: [...state.listReEx, action.payload],
                totalIncome: state.totalIncome + (action.payload.type === 'income' ? action.payload.amount : 0),
                totalExpense: state.totalExpense + (action.payload.type === 'expense' ? action.payload.amount : 0),
                error: '',
            };
        case ADD_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                listReEx: state.listReEx.map(item => item._id === action.payload._id ? action.payload : item),
                totalIncome: state.totalIncome - (oldItem.type === 'income' ? oldItem.amount : 0) + (updatedItem.type === 'income' ? updatedItem.amount : 0),
                totalExpense: state.totalExpense - (oldItem.type === 'expense' ? oldItem.amount : 0) + (updatedItem.type === 'expense' ? updatedItem.amount : 0),
                error: '',
            };
        case UPDATE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.toString(),
            };
        case DELETE_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                listReEx: state.listReEx.filter(item => item._id !== action.payload),
                totalIncome: state.totalIncome - (deletedItem.type === 'income' ? deletedItem.amount : 0),
                totalExpense: state.totalExpense - (deletedItem.type === 'expense' ? deletedItem.amount : 0),
                error: '',
            };
        case DELETE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SEARCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEARCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                searchResults: action.payload,
                error: '',
            };
        case SEARCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case RESET_SEARCH:
            return {
                ...state,
                searchResults: [],
            };
        default:
            return state;
    }
}

export default dataReducer;