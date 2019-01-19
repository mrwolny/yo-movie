/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = (env = {}) => ({
  entry: './src/app/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
    ],
  },
  optimization: {
    // if webpack started with --env.local don't minimize
    minimize: !env.local,
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      favicon: '',
      template: path.resolve(__dirname, './assets/index.html'),
    }),
    new CopyWebpackPlugin([
      './src/sw.js',
    ]),
    new LiveReloadPlugin(),
  ],
});
