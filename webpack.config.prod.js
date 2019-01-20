const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
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
        options: {
          compact: true,
        },
      },
      {
        test: /\.html$/,
        exclude: /node_module/,
        loader: require.resolve('html-loader'),
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              minimize: true,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              outputStyle: 'compressed',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      _env: {
        simpleShareAPIUrl: '"https://developer.api.autodesk.com"',
        simpleShareAPIVersion: '"/simple-share/v1"',
        userProfileApi: '"https://developer.api.autodesk.com/userprofile/v1/users/@me"',
        commentAPIUrl: '"https://developer.api.autodesk.com"',
        commentAPIVersion: '"/comments/v2/resources/"',
        simpleShareAttachmentHrefUrl: '"https://developer.api.autodesk.com/simple-share/v1/viewer/GetShareCommentAttachment?commentAttachmentId="',
      },
    }),
  ],
};
