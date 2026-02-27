import { createSlice } from "@reduxjs/toolkit";
import { reportsSeed } from "../data";

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    items: reportsSeed,
  },
  reducers: {
    addReport(state, action) {
      state.items.unshift(action.payload);
    },
  },
});

export const { addReport } = reportsSlice.actions;
export default reportsSlice.reducer;
