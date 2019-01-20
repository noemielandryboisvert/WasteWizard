const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        enforce: 'pre',
        loader: require.resolve('eslint-loader'),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        exclude: /node_module/,
        loaders: require.resolve('url-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.html$/,
        exclude: /node_module/,
        loader: require.resolve('html-loader'),
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader'),
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      _env: {
        simpleShareAPIUrl: '"https://developer-stg.api.autodesk.com"',
        simpleShareAPIVersion: '"/simple-share/v1"',
        userProfileApi: '"https://developer-stg.api.autodesk.com/userprofile/v1/users/@me"',
        commentAPIUrl: '"https://developer-stg.api.autodesk.com"',
        commentAPIVersion: '"/comments/v2/resources/"',
        simpleShareAttachmentHrefUrl: '"https://developer-stg.api.autodesk.com/simple-share/v1/viewer/GetShareCommentAttachment?commentAttachmentId="',
      },
    }),
  ],
  performance: {
    hints: false,
  },
};
