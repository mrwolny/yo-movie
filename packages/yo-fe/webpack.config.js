/* eslint-disable */
var webpack = require('webpack')
const slsw = require('serverless-webpack');
var nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin')

var serverConfig = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      { test: /\.css$/, use: [
        { loader: MiniCssExtractPlugin.loader },
        'css-loader'
      ]}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    }),
    // serverless-webpack deployment
    new CopyWebpackPlugin([
      'dist/*'
    ])
  ]
}

module.exports = serverConfig;
