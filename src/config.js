import { getServerURL } from "@codedrops/lib";

// dont destructure, it does not work in next.js
const NODE_ENV = process.env.NODE_ENV;
const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
const SENTRY_URL = process.env.NEXT_PUBLIC_SENTRY_URL;
const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_ID;
const MIXPANEL_TRACKING_ID = process.env.NEXT_PUBLIC_MIXPANEL_TRACKING_ID;

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

const isProd = NODE_ENV === "production";

const config = {
  NODE_ENV,
  IS_DEV: NODE_ENV === "development",
  IS_PROD: NODE_ENV === "production",
  CRISP_WEBSITE_ID,
  SERVER_URL: getServerURL({ isProd }),
  COLLECTION_ID: COLLECTION_ID || "61bc9ac5a31cc4ff1dea687d",
  SENTRY_URL,
  MIXPANEL_TRACKING_ID,
  POST_COUNT: 25,
  appId: "LIQUID_SEARCH",
  appName: "Liquid Search",
  sponser: "https://www.buymeacoffee.com/mehullakhanpal",
  FIREBASE: {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
  },
  FEED_SIZE_LIMIT: 12,
  liquidRoutes: ["apps", "learn", "development", "build", "jobs"],
};

export default config;
