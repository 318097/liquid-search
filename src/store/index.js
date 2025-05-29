import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./posts";
import appReducer from "./app";
import liquidReducer from "./liquid";
import keybindingsReducer from "./keybindings";
import { createWrapper } from "next-redux-wrapper";

const config = {
  reducer: {
    posts: postReducer,
    app: appReducer,
    keybindings: keybindingsReducer,
    liquid: liquidReducer,
  },
};

export const store = configureStore(config);

export const wrapper = createWrapper(() => configureStore(config), {
  // debug: true,
});
