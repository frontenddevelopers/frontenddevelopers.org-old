/* eslint-disable  */
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import settings from './settings';

const { server: { port, host, proxyPort, proxyHost } } = settings;

const SRC = path.resolve('./app/src');
const DIST = path.resolve('./app/dist');
const PUBLIC_PATH = '/assets/';

export default env => ({
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
    extensions: ['', '.js'],
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
    host: proxyHost,
    port: proxyPort,
    proxy: {
      '**': `http://${host}:${port}`,
    }
  },
});
