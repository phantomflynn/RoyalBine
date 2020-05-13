const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = require("./environment");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  output: {
    filename: "[name].[hash].bundle.js",
    chunkFilename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html" }),
    new InterpolateHtmlPlugin(env.interpolateHtmlEnvFormat),
    new webpack.DefinePlugin(env.definePluginEnvFormat),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.resolve(__dirname, "../src"),
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
      tslint: path.resolve(__dirname, "../tslint.json")
    })
  ]
};
