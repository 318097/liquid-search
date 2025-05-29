import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { HYDRATE } from "next-redux-wrapper";
import { parseTitle } from "../../lib/utils";

export const keybindingsSlice = createSlice({
  name: "keybindings",
  initialState: {
    keybindings: [],
    tags: [],
    highlightedIds: [],
    filters: {
      search: "",
      tags: [],
    },
    total: 0,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setHighlightedIds: (state, action) => {
      state.highlightedIds = action.payload;
    },
    setKeybindings: (state, action) => {
      state.keybindings = action.payload;
      state.total = action.payload.length;
      state.tags = _.map(
        _.uniq(_.map(action.payload, "platform")),
        (value) => ({ label: parseTitle(value), value })
      );
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE==", state);
      return {
        ...action.payload.keybindings,
      };
    },
  },
});

export const { setFilters, updateFilters, setKeybindings, setHighlightedIds } =
  keybindingsSlice.actions;

export default keybindingsSlice.reducer;
