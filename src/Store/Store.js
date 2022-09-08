import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import ListSlice from "./ListSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    list: ListSlice,
  },
});

export default store;
