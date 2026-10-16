import { createSlice } from "@reduxjs/toolkit";

const favoritSlice = createSlice({
  name: "favorit",
  initialState: [] as string[],
  reducers: {
    toggle(state, action: { payload: string }) {
      const slug = action.payload;
      const i = state.indexOf(slug);
      if (i >= 0) state.splice(i, 1);
      else state.push(slug);
    },
  },
});

export const { toggle } = favoritSlice.actions;
export default favoritSlice.reducer;
