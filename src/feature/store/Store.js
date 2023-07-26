import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
import activeSlice from "../Slice/activeChatting";
import themeSlice from "../Slice/themeSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
    active: activeSlice,
    themeChange: themeSlice,
  },
});

export default store;
