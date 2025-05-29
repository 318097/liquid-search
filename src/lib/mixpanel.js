import { EventTracker } from "@codedrops/lib";
import config from "../config";

const events = {
  INIT: { name: "Init" },
  ACTION: { name: "Action", fields: ["command", "type"] },
  OTHER_PRODUCTS: { name: "Other products", fields: ["name"] },
  SUPPORT: { name: "Support", fields: ["type"] },
  CLICKED_SOCIAL_ICON: {
    name: "Clicked social icon",
    fields: ["platform"],
  },
  BUY_ME_A_COFFEE: { name: "Buy me a coffee" },
  LOAD_MORE_POSTS: { name: "Load more posts", fields: ["postType"] },
  VIEW_POST: { name: "View post", fields: ["postType", "title"] },
  CLICKED_MORE: { name: "Show more", fields: ["postType"] },
};

const tracker = new EventTracker(
  {
    events,
    trackingId: config.MIXPANEL_TRACKING_ID,
    isDev: !config.IS_PROD,
  },
  { defaultProperties: { env: config.IS_PROD ? "prod" : "dev" } }
);

export default tracker;
