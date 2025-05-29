import axios from "axios";
import _ from "lodash";
import { handleError } from "../../lib";
import { setAppLoading } from "../app";
import config from "../../config";
import {
  setPosts,
  setPostById,
  setFilters,
  setTags,
  setRelatedPosts,
  setTotalText,
} from "./index";
import { recalculateBreadcrumbs } from "../app/actions";
import { getPosts } from "../../lib/db";

export const fetchTags = () => async (dispatch) => {
  const {
    data: { tags },
  } = await axios.get("/posts/tags");

  const tagList = tags.map(({ _id, color, name }) => ({
    _id,
    color,
    label: name.toUpperCase(),
    value: name,
  }));

  dispatch(setTags(tagList));
};

export const calculateTotalText = () => async (dispatch, getState) => {
  const {
    posts: { posts, total },
  } = getState();

  dispatch(setTotalText(`${posts.length}/${total}`));
};

export const fetchPosts = () => async (dispatch, getState) => {
  try {
    dispatch(setAppLoading(true));
    const {
      posts: { filters = {}, posts = [] },
    } = getState();

    const updatedPosts = filters && filters.page > 1 ? [...posts] : [];
    const { posts: data, meta } = await getPosts(filters);
    updatedPosts.push(...data);
    await dispatch(
      setPosts({
        posts: updatedPosts,
        meta,
      })
    );
    dispatch(calculateTotalText());
  } catch (error) {
    handleError(error);
  } finally {
    dispatch(setAppLoading(false));
  }
};

export const setFilter =
  (filterUpdate, resetPage = true) =>
  async (dispatch, getState) => {
    const {
      posts: { filters = {} },
    } = getState();
    const updatedFiters = { ...filters, ...filterUpdate };

    if (resetPage) updatedFiters["page"] = 1;

    await dispatch(setFilters(updatedFiters));
    dispatch(fetchPosts());
  };

export const getPostById = (post) => async (dispatch, getState) => {
  try {
    dispatch(setPostById(post));

    const {
      posts: { filters },
    } = getState();

    const {
      data: { posts: relatedPosts },
    } = await axios.get(`/posts/random`, {
      params: {
        collectionId: config.COLLECTION_ID,
        tags: filters.tags,
        postId: post._id,
      },
    });

    dispatch(setRelatedPosts(relatedPosts));
    dispatch(recalculateBreadcrumbs());
  } catch (error) {
    handleError(error);
  } finally {
    // dispatch(setAppLoading(false));
  }
};

export const goToNextPost = (direction) => (dispatch, getState) => {
  try {
    const {
      posts: { posts, selectedPost },
    } = getState();

    let currentPostIdx = _.findIndex(
      posts,
      (post) => post._id === selectedPost._id
    );
    const newPostIdx = currentPostIdx + direction;

    if (posts[newPostIdx]) {
      return posts[newPostIdx];
    }
  } catch (error) {
    handleError(error);
  }
};
