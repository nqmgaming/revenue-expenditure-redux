import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../reducers/ReExReducer";

export const store = configureStore({
  reducer: {
    dataReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
