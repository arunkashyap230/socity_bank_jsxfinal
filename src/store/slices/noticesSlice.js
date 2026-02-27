import { createSlice } from "@reduxjs/toolkit";
import { noticesSeed } from "../data";

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    items: noticesSeed,
  },
  reducers: {
    addNotice(state, action) {
      state.items.unshift(action.payload);
    },
  },
});

export const { addNotice } = noticesSlice.actions;
export default noticesSlice.reducer;
