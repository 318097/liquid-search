const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const nextConfiguration = {
  images: {
    loader: "imgix",
    path: "https://noop/",
  },
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
};

module.exports = withPlugins([optimizedImages], nextConfiguration);
