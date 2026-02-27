import { createSlice } from "@reduxjs/toolkit";
import { guarantorsSeed } from "../data";

const guarantorsSlice = createSlice({
  name: "guarantors",
  initialState: {
    items: guarantorsSeed,
  },
  reducers: {
    addGuarantor(state, action) {
      state.items.push(action.payload);
    },
  },
});

export const { addGuarantor } = guarantorsSlice.actions;
export default guarantorsSlice.reducer;
