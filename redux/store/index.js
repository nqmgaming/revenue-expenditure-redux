import { configureStore } from "@reduxjs/toolkit";
import ReExReducer from "../reducers/ReExReducer";

export const store = configureStore({
    reducer: {
        ReEx: ReExReducer,
    },
});