import { createSlice } from "@reduxjs/toolkit";

export const ListSlice = createSlice({
  name: "list",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = ListSlice.actions;

export default ListSlice.reducer;
