import axios from "axios";
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const ADD_DATA_REQUEST = 'ADD_DATA_REQUEST';
export const ADD_DATA_SUCCESS = 'ADD_DATA_SUCCESS';
export const ADD_DATA_FAILURE = 'ADD_DATA_FAILURE';
export const UPDATE_DATA_REQUEST = 'UPDATE_DATA_REQUEST';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';
export const UPDATE_DATA_FAILURE = 'UPDATE_DATA_FAILURE';
export const DELETE_DATA_REQUEST = 'DELETE_DATA_REQUEST';
export const DELETE_DATA_SUCCESS = 'DELETE_DATA_SUCCESS';
export const DELETE_DATA_FAILURE = 'DELETE_DATA_FAILURE';
export const SEARCH_DATA_REQUEST = 'SEARCH_DATA_REQUEST';
export const SEARCH_DATA_SUCCESS = 'SEARCH_DATA_SUCCESS';
export const SEARCH_DATA_FAILURE = 'SEARCH_DATA_FAILURE';
export const RESET_SEARCH = 'RESET_SEARCH';

export const fetchData = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'FETCH_DATA_REQUEST' });
            const response = await axios.get(`${process.env.API_URL}`)
            dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
        }
    }
}

export const addData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'ADD_DATA_REQUEST' });
            const response = await axios.post(`${process.env.API_URL}`, data)
            dispatch({ type: 'ADD_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'ADD_DATA_FAILURE', payload: error });
        }
    }
}

export const updateData = (id, data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'UPDATE_DATA_REQUEST' });
            const response = await axios.patch(`${process.env.API_URL}/${id}`, data)
            dispatch({ type: 'UPDATE_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'UPDATE_DATA_FAILURE', payload: error.toString() });
        }
    }
}

export const deleteData = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'DELETE_DATA_REQUEST' });
            const response = await axios.delete(`${process.env.API_URL}/${id}`)
            dispatch({ type: 'DELETE_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'DELETE_DATA_FAILURE', payload: error.toString() });
        }
    }
}


export const searchData = (searchTerm) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SEARCH_DATA_REQUEST' });
            const response = await axios.get(`${process.env.API_URL}/search/?title=${searchTerm}`);
            dispatch({ type: 'SEARCH_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SEARCH_DATA_FAILURE', payload: error });
        }
    }
}

export const resetSearch = () => {
    return {
        type: 'RESET_SEARCH'
    }
}