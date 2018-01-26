const path = require("path");

// module.exports = (baseConfig, env, defaultConfig) => {
//   defaultConfig.resolve = defaultConfig.resolve || {};
//   defaultConfig.resolve.alias["shared"] = path.resolve(__dirname, "../shared");
//   return defaultConfig;
// };

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: process.env.ASSETS_BASE_URL
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, "../shared")
    }
  }
};
