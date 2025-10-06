import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reRender: 0,
  TotalTask: 0,
  isSideBarOpen: false,
  filterByStatus: "all",
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
    setReRender: (state) => {
      state.reRender = Math.random() * 100000;
    },
    setTotalTask: (state, action) => {
      state.reRender = action.payload;
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
  setReRender,
  setTotalTask,
  openCreateTaskModal,
  closeCreateTaskModal,
  toggleUpdateTaskModal,
} = useStateSlice.actions;

export default useStateSlice.reducer;
