import axios from "axios";
import config from "../config";
import { getAndFormatProducts } from "@codedrops/lib";
import handleError from "./errorHandler";
import _ from "lodash";

const getAllPostIds = async () => {
  const { data } = await axios.get(
    `/posts/post-ids?collectionId=${config.COLLECTION_ID}`
  );
  const postIds = data.postIds.map(({ slug }) => slug);

  return postIds.map((postId) => {
    return {
      params: {
        id: postId,
      },
    };
  });
};

const getPosts = async (params = { limit: config.FEED_SIZE_LIMIT }) => {
  const {
    data: { posts, meta },
  } = await axios.get(`/posts?collectionId=${config.COLLECTION_ID}`, {
    params,
  });
  return { posts, meta };
};

const getProducts = async () => {
  const { others: products } = await getAndFormatProducts({
    appId: config.appId,
    trackingInfo: { utm_medium: "about" },
  });
  return products;
};

const getPostDataById = async (postId) => {
  const {
    data: { post },
  } = await axios.get(`/posts/${postId}?collectionId=${config.COLLECTION_ID}`);
  return post;
};

const getKeybindings = _.memoize(
  async (params = { limit: config.FEED_SIZE_LIMIT }) => {
    try {
      const {
        data: { data },
      } = await axios.get(`/notion/keybindings`, {
        // params,
      });

      return data;
    } catch (err) {
      handleError(err);
    }
  }
);

const getLiquid = _.memoize(
  async (params = { limit: config.FEED_SIZE_LIMIT }) => {
    try {
      const {
        data: { data },
      } = await axios.get(`/notion/liquid-tech`, {
        // params,
      });

      return data;
    } catch (err) {
      handleError(err);
    }
  }
);

export {
  getPostDataById,
  getAllPostIds,
  getPosts,
  getProducts,
  getKeybindings,
  getLiquid,
};
