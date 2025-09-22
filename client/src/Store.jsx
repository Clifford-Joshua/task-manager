import { configureStore } from "@reduxjs/toolkit";

import useStateSlice from "./Features/useStateSlice";

export const store = configureStore({
  reducer: {
    stateSlice: useStateSlice,
  },
});
