import { createSlice } from "@reduxjs/toolkit";
import { loansSeed } from "../data";

const loansSlice = createSlice({
  name: "loans",
  initialState: {
    items: loansSeed,
  },
  reducers: {
    addLoan(state, action) {
      state.items.push(action.payload);
    },
    updateLoanStatus(state, action) {
      const { id, status } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, status } : item,
      );
    },
  },
});

export const { addLoan, updateLoanStatus } = loansSlice.actions;
export default loansSlice.reducer;
