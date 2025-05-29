import config from "../../config";
import _ from "lodash";
import { tags, tagColors } from "../../constants";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { parseTitle } from "../../lib/utils";

const INITIAL_FILTERS = {
  search: "",
  page: 1,
  limit: config.POST_COUNT,
  tags: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    total: 0,
    totalText: null,
    meta: null,
    tags: tags.map((tag) => ({ ...tag, label: parseTitle(tag.value) })),
    tagKeys: tagColors,
    selectedPost: null,
    filters: INITIAL_FILTERS,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
      state.meta = action.payload.meta;
      state.total = action.payload.meta?.count;
    },
    setPostById: (state, action) => {
      state.selectedPost = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
      state.tagKeys = _.keyBy(action.payload, "value");
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setRelatedPosts: (state, action) => {
      state.relatedPosts = action.payload;
    },
    resetFilters: (state) => {
      state.filters = INITIAL_FILTERS;
    },
    setTotalText: (state, action) => {
      state.totalText = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log("HYDRATE==", state);
      // console.log("HYDRATE KEYS", Object.keys(action.payload.posts));
      return {
        ...action.payload.posts,
      };
    },
  },
});

export const {
  setPosts,
  setPostById,
  setFilters,
  setRelatedPosts,
  updateFilters,
  setTags,
  resetFilters,
  setTotalText,
} = postSlice.actions;

export default postSlice.reducer;
