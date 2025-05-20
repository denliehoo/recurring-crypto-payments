const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();

module.exports = ({ appDir, port }) => ({
  mode: "development",
  entry: path.resolve(appDir, "src/index.tsx"),
  output: {
    path: path.resolve(appDir, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: [
          path.resolve(appDir, "src"),
          path.resolve(appDir, "../../packages/components/src"),
          path.resolve(appDir, "../../packages/core/src"),
        ],
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDir, "public/index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_API_URL": JSON.stringify(
        process.env.REACT_APP_API_URL
      ),
      "process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@components": path.resolve(appDir, "../../packages/components/src"),
      "@core": path.resolve(appDir, "../../packages/core/src"),
    },
    modules: [path.resolve(appDir, "node_modules"), "node_modules"],
  },
  devServer: {
    port,
    historyApiFallback: true,
    open: true,
  },
});
