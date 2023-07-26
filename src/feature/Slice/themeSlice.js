import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "DarkMode",
  initialState: {
    DarkMode: localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode"))
      : false,
  },
  reducers: {
    Thememode: (state, action) => {
      state.DarkMode = action.payload;
    },
  },
});

export const { Thememode } = themeSlice.actions;

export default themeSlice.reducer;
