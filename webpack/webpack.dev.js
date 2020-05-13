const DashboardPlugin = require('webpack-dashboard/plugin');
const Dashboard = require('webpack-dashboard');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');

const dashboard = new Dashboard();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    quiet: true,
    host: 'localhost',
    port: 8082
  },
  plugins: [
    new DashboardPlugin({ handler: dashboard.setData })
  ]
});
