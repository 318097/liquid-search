import _ from "lodash";
import colors from "../lib/magicdust";
import config from "../config";
import handleError from "./errorHandler";

const viewMap = {
  ctrlKey: "Ctrl",
  metaKey: "Cmd",
  shiftKey: "Shift",
  altKey: "Alt",
  fn: "Fn",
};

const generateCommandString = (binding) => {
  const order = [
    "fn",
    "ctrlKey",
    "metaKey",
    "shiftKey",
    "altKey",
    "_keys",
    "key",
  ];

  const filtered = order.filter((k) => !!binding[k]);
  const parsed = filtered.map((k) => {
    if (viewMap[k]) return viewMap[k];
    else if (k === "_keys") return binding[k].join("/");
    return _.capitalize(binding[k]);
  });
  return parsed.join("+");
};

const getOS = () => {
  if (typeof window !== "undefined") return;

  // var userAgent = window?.navigator.userAgent,
  //   platform = window?.navigator.platform,
  //   macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
  //   windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
  //   iosPlatforms = ["iPhone", "iPad", "iPod"],
  //   os = null;

  // if (macosPlatforms.indexOf(platform) !== -1) {
  //   os = "MAC";
  // } else if (iosPlatforms.indexOf(platform) !== -1) {
  //   os = "iOS";
  // } else if (windowsPlatforms.indexOf(platform) !== -1) {
  //   os = "WINDOWS";
  // } else if (/Android/.test(userAgent)) {
  //   os = "ANDROID";
  // } else if (!os && /Linux/.test(platform)) {
  //   os = "LINUX";
  // }

  // return os;
};

const getRandomIdxFromArray = (arr, { usePredictiveIdx } = {}) => {
  let random = Math.random() * 1000;

  if (usePredictiveIdx) {
    random = new Date().getDate();
  }
  return Math.floor(random) % arr.length;
};

const getRandomElementFromArray = (arr, options = {}) => {
  const idx = getRandomIdxFromArray(arr, options);
  return arr[idx];
};

const COLORS = [
  { primary: "#B1EAE8" },
  { primary: "#F5CCC3" },
  { primary: "#AEE5D1" },
  { primary: "#C4A6A6" },
];

const parseTitle = (name) => `#${_.replace(_.startCase(name), /\s/, "")}`;

const FEED_LAYOUT = [
  {
    type: "POST",
    key: "posts",
    title: "#WebDevelopment",
    breadcrumbTitle: "Web Development",
    description: "Mini posts around web development",
    href: "/posts",
    contentContainerClass: "posts-wrapper",
    color: colors.nbPink,
    visible: true,
    titlePath: "posts.selectedPost.title",
  },
  {
    type: "KEYBINDINGS",
    key: "keybindings",
    title: "#KeyboardShortcuts",
    breadcrumbTitle: "Keyboard Shortcuts",
    description: "Super productive keyboard shortcuts",
    href: "/keybindings",
    contentContainerClass: "keybindings-wrapper",
    color: colors.foBlue,
    visible: true,
  },
  {
    type: "LIQUID",
    key: "apps",
    title: "#Apps",
    breadcrumbTitle: "Apps",
    description:
      "Softwares, Extensions, Websites and Apps for setting up the env",
    href: "/apps",
    contentContainerClass: "liquid-wrapper",
    color: colors.purple,
    visible: true,
  },
  {
    type: "LIQUID",
    key: "learn",
    title: "#Learn",
    breadcrumbTitle: "Learn",
    description: "Everything related to learning & development",
    href: "/learn",
    contentContainerClass: "liquid-wrapper",
    color: colors.cdGreen,
    visible: true,
  },
  {
    type: "LIQUID",
    key: "development",
    title: "#Development",
    breadcrumbTitle: "Development",
    description: "All things related or required for development",
    href: "/development",
    contentContainerClass: "liquid-wrapper",
    color: colors.nbOrange,
    visible: true,
  },
  {
    type: "LIQUID",
    key: "build",
    title: "#Build",
    breadcrumbTitle: "Build",
    description: "",
    href: "/build",
    contentContainerClass: "liquid-wrapper",
    color: colors.blue,
    visible: true,
  },
  {
    type: "LIQUID",
    key: "jobs",
    title: "#FindJobs",
    breadcrumbTitle: "Jobs",
    description: "Finding jobs",
    href: "/jobs",
    contentContainerClass: "liquid-wrapper",
    color: colors.nbOrange,
    visible: true,
  },
  {
    type: "LIQUID",
    key: "interviews",
    title: "#InterviewPreparation",
    breadcrumbTitle: "Interview Preparation",
    description: "",
    href: "/interviews",
    contentContainerClass: "liquid-wrapper",
    color: colors.nbOrange,
    visible: true,
    comingSoon: true,
    sortIdx: 100,
  },
  {
    type: "PRODUCTS",
    key: "products",
    title: "#OtherProducts",
    breadcrumbTitle: "Other Products",
    contentContainerClass: "products-wrapper",
    color: colors.blue,
    visible: true,
    sortIdx: 1000,
  },
];

const getFeedConfig = (id) => FEED_LAYOUT.find((layout) => layout.key === id);

const getDataFromStorage = (key) => {
  try {
    return JSON.parse(window?.localStorage.getItem(key) || "{}");
  } catch (err) {
    handleError(err);
    return {};
  }
};

const saveDataToStorage = (key, data) => {
  try {
    const prev = getDataFromStorage(key);
    window?.localStorage.setItem(
      key,
      JSON.stringify({ ...prev, ...data }),
      undefined,
      2
    );
  } catch (err) {
    handleError(err);
  }
};

const initialize = () => {
  try {
    const key = config.appId;
    let data = getDataFromStorage(key);
    if (_.isEmpty(data)) {
      data = { visits: [], totalVisits: 0, visitedLinks: [] };
    }
    const d = new Date();
    const today = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (today !== _.last(data["visits"])) {
      data["visits"].push(today);
      data["totalVisits"] = (data["totalVisits"] || 0) + 1;
    }
    saveDataToStorage(key, data);
  } catch (err) {
    handleError(err);
  }
};

const getTotalCount = (state) => {
  const total = {};
  config.liquidRoutes.forEach((route) => {
    total[route] = _.get(state, ["liquid", "data", route, "length"]);
  });

  return total;
};

export {
  viewMap,
  generateCommandString,
  getOS,
  getRandomElementFromArray,
  COLORS,
  parseTitle,
  FEED_LAYOUT,
  getFeedConfig,
  initialize,
  getDataFromStorage,
  saveDataToStorage,
  getTotalCount,
};
