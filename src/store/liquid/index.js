import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { parseTitle } from "../../lib/utils";

const INITIAL_FILTERS = {
  tags: "",
};

export const liquidSlice = createSlice({
  name: "liquid",
  initialState: {
    filters: INITIAL_FILTERS,
    data: {
      apps: [],
      learn: [],
      development: [],
      jobs: [],
      build: [],
    },
    currentL0: null,
    // total: 0,
  },
  reducers: {
    setLiquidData: (state, action) => {
      const data = {};
      const tagOptions = {};
      _.forEach(action.payload, (list, type) => {
        data[type] = list || [];

        tagOptions[type] = _.map(
          _.uniq(_.filter(_.map(list, "subType"), (subType) => !!subType)),
          (subType) => ({ label: parseTitle(subType), value: subType })
        );
      });

      state.data = data;
      state.tagOptions = tagOptions;
      // state.total = _.reduce(
      //   Object.values(data),
      //   (sum, list) => sum + list.length,
      //   0
      // );
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCurrentL0: (state, action) => {
      state.currentL0 = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE==", state);
      // console.log("HYDRATE KEYS", Object.keys(action.payload.posts));
      return {
        ...action.payload.liquid,
      };
    },
  },
});

export const { setLiquidData, setFilters, updateFilters, setCurrentL0 } =
  liquidSlice.actions;

export default liquidSlice.reducer;
