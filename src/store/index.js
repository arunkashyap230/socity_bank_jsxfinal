import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "./slices/membersSlice";
import loansReducer from "./slices/loansSlice";
import guarantorsReducer from "./slices/guarantorsSlice";
import noticesReducer from "./slices/noticesSlice";
import reportsReducer from "./slices/reportsSlice";

export const store = configureStore({
  reducer: {
    members: membersReducer,
    loans: loansReducer,
    guarantors: guarantorsReducer,
    notices: noticesReducer,
    reports: reportsReducer,
  },
});
