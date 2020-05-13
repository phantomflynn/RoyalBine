const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const env = require('./environment');
const common = require('./webpack.common');

// guarantee that NODE_ENV is set to production when running prod build
// note: the nested quotes around 'production' is not an accident and completely necessary
// env.definePluginEnvFormat['process.env.NODE_ENV'] = "'production'";

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin(env.definePluginEnvFormat)
  ]
});
