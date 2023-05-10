import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/userSlice";

const store = configureStore({
  reducer: {
    login: authSlice,
  },
});

export default store;
