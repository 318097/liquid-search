import _ from "lodash";
// import { handleError } from "../../lib";
// import { setAppLoading } from "../app";
import { setHighlightedIds } from "./index";

// export const setFilter =
//   (filterUpdate, resetPage = true) =>
//   async (dispatch, getState) => {
//     const {
//       posts: { filters = {} },
//     } = getState();
//     const updatedFiters = { ...filters, ...filterUpdate };

//     if (resetPage) updatedFiters["page"] = 1;

//     await dispatch(setFilters(updatedFiters));
//     // dispatch(fetchPosts());
//   };

export const onRecordKeybinding = (binding) => async (dispatch, getState) => {
  const {
    keybindings: { keybindings },
  } = getState();

  const matchedKeybindings = _.filter(keybindings, (keybinding) =>
    _.isEqual(keybinding.binding, binding)
  );

  if (matchedKeybindings)
    dispatch(setHighlightedIds(_.map(matchedKeybindings, "_id")));
};
