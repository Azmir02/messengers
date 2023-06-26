import { createSlice } from "@reduxjs/toolkit";

export const activeSlice = createSlice({
  name: "activeChatting",
  initialState: {
    activeState: null,
  },
  reducers: {
    activeUserChat: (state, action) => {
      state.activeState = action.payload;
    },
  },
});

export const { activeUserChat } = activeSlice.actions;

export default activeSlice.reducer;
