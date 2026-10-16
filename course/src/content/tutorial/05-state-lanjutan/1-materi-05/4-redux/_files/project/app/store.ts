import { configureStore } from "@reduxjs/toolkit";
import favoritReducer from "./favorit-slice";

export const store = configureStore({
  reducer: { favorit: favoritReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
