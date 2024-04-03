import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/ReExReducer";

export const store = configureStore({
    reducer: {
        dataReducer,
    },
});