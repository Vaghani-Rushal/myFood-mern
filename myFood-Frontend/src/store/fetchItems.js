import { createSlice } from "@reduxjs/toolkit";

const fetchItemStatusSlice = createSlice({
  name: "fetchItemStatus",
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

export const fetchItemStatusActions = fetchItemStatusSlice.actions;
export default fetchItemStatusSlice;
