import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOpen: false,
  filterByStatus: "all",
  isExecutedBySelf: false,
  filterByExecutor: "all",
  isUpdateTaskModalOpen: false,
  isCreateTaskModalOpen: false,
};

const useStateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    closeSideBar: (state) => {
      state.isSideBarOpen = false;
    },
    filterStatus: (state, action) => {
      state.filterByStatus = action.payload;
    },
    filterExecutor: (state, action) => {
      state.filterByExecutor = action.payload;
    },
    openCreateTaskModal: (state) => {
      state.isCreateTaskModalOpen = true;
    },
    closeCreateTaskModal: (state) => {
      state.isCreateTaskModalOpen = false;
    },
    toggleExecutedBySelf: (state) => {
      state.isExecutedBySelf = !state.isExecutedBySelf;
    },
    toggleUpdateTaskModal: (state) => {
      state.isUpdateTaskModalOpen = !state.isUpdateTaskModalOpen;
    },
  },
});

export const {
  toggleSideBar,
  closeSideBar,
  filterExecutor,
  filterStatus,
  openCreateTaskModal,
  closeCreateTaskModal,
  toggleExecutedBySelf,
  toggleUpdateTaskModal,
} = useStateSlice.actions;

export default useStateSlice.reducer;
