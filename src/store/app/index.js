import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { FEED_LAYOUT } from "../../lib/utils";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    appLoading: false,
    appNotification: null,
    session: null,
    breadcrumbs: [],
    layout: FEED_LAYOUT,
    feedData: {
      posts: [],
      keybindings: [],
      products: [],
      apps: [],
      learn: [],
      development: [],
      build: [],
      jobs: [],
    },
    route: "",
  },
  reducers: {
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
    updateBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    updateFeedData: (state, action) => {
      state.feedData = { ...state.feedData, ...action.payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE==", state);
      return {
        ...action.payload.app,
      };
    },
  },
});

export const {
  setAppLoading,
  setSession,
  updateBreadcrumbs,
  setRoute,
  updateFeedData,
} = appSlice.actions;

export default appSlice.reducer;
