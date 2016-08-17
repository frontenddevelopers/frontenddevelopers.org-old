/* eslint-disable  */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var SRC = path.resolve('./app/src');
var DIST = path.resolve('./app/dist');
var PUBLIC_PATH = '/assets/';

var config = env => ({
  entry: [
    './app/src/index.js',
  ],
  output: {
    path: DIST,
    filename: 'bundle.js',
    publicPath: PUBLIC_PATH,
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpg|svg|gif|mp4)$/,
        loaders: [
          'url?limit=20000',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: env && !env.prod
          ? 'style?sourceMap!css!sass'
          : ExtractTextPlugin.extract({ fallbackLoader: 'style', loader: 'css?sourceMap!sass' }),
      },
    ],
  },
  devtool: env && env.prod ? 'source-map' : 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['', '.js', '.css'],
    modules: [
      SRC,
      'node_modules'
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
    }),
    new webpack.NoErrorsPlugin(),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8050,
    proxy: {
      '**': 'http://localhost:3000'
    }
  },
});

module.exports = config;
