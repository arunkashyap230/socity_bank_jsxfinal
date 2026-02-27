import { createSlice } from "@reduxjs/toolkit";
import { membersSeed } from "../data";

const membersSlice = createSlice({
  name: "members",
  initialState: {
    items: membersSeed,
  },
  reducers: {
    addMember(state, action) {
      state.items.push(action.payload);
    },
    updateMember(state, action) {
      const updated = action.payload;
      state.items = state.items.map((item) =>
        item.id === updated.id ? { ...item, ...updated } : item,
      );
    },
  },
});

export const { addMember, updateMember } = membersSlice.actions;
export default membersSlice.reducer;
