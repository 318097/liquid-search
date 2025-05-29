import _ from "lodash";
// import { handleError } from "../../lib";
// import config from "../../config";
import { updateBreadcrumbs, setRoute } from "./index";

export const setAppRoute = (route) => async (dispatch) => {
  await dispatch(setRoute(route?.split("?")[0] ?? ""));
  dispatch(recalculateBreadcrumbs());
};

export const recalculateBreadcrumbs = () => async (dispatch, getState) => {
  const {
    app: { route, layout },
  } = getState();
  console.log(`Route: ${route}`);
  const [level1Path, level2Path] = route?.slice(1).split("/") || [];
  const level1 = layout.find((l) => l.href === `/${level1Path}`) || {};
  const level2Title = _.get(getState(), level1["titlePath"]);

  const breadcrumbs = [
    { title: "Home", href: "/", visible: true },
    {
      title: level1.breadcrumbTitle,
      href: level1.href,
      visible: !!level1Path,
    },
    {
      title: level2Title,
      href: "#",
      visible: !!level2Path && !!level2Title,
    },
  ].filter((menu) => menu.visible);

  dispatch(updateBreadcrumbs(breadcrumbs));
};
