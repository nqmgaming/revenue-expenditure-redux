import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'


export const fetchData = createAsyncThunk('data/fetch', async () => {
    const response = await axios.get(`${process.env.API_URL}`);
    return response.data;
});

export const addData = createAsyncThunk('data/add', async (data) => {
    const response = await axios.post(`${process.env.API_URL}`, data);
    return response.data;
});

export const updateData = createAsyncThunk('data/update', async ({ id, data }) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const response = await axios.patch(`${process.env.API_URL}/${id}`, data);
    return response.data;
});

export const deleteData = createAsyncThunk('data/delete', async (id) => {
    const response = await axios.delete(`${process.env.API_URL}/${id}`);
    return response.data;
});

export const searchData = createAsyncThunk('data/search', async (searchTerm) => {
    const response = await axios.get(`${process.env.API_URL}/search/?title=${searchTerm}`);
    return response.data;
});

export const resetSearch = createAsyncThunk('search/reset', async () => {
    return {};
});