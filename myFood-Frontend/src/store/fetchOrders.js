import { createSlice } from "@reduxjs/toolkit";

const fetchOrderStatusSlice = createSlice({
  name: "fetchOrderStatus",
  initialState: {
    fetchDone: false,
    currentlyFetching: false,
  },

  reducers: {
    markFetchDone: (state) => {
      state.fetchDone = true;
    },

    markFetchingStarted: (state) => {
      state.currentlyFetching = true;
    },

    markFetchingFinished: (state) => {
      state.currentlyFetching = false;
    },
  },
});

export const fetchOrderStatusActions = fetchOrderStatusSlice.actions;
export default fetchOrderStatusSlice;
