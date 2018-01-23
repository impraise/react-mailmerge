const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
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
      shared: path.resolve(__dirname, "shared")
    }
  },
  target: "node"
};
