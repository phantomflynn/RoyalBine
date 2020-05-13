const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodWebpackConfig = require('./webpack.prod');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(prodWebpackConfig, {
  plugins: [new BundleAnalyzerPlugin()]
});
