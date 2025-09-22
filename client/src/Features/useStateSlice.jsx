import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
};

const useStateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

export const { toggleSideBar } = useStateSlice.actions;

export default useStateSlice.reducer;
