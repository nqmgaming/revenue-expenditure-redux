import { configureStore } from "@reduxjs/toolkit";
import dataSlide from "../reducers/ReExReducer";

export const store = configureStore({
  reducer: {
    listReEx: dataSlide,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
