var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./src/google-maps-geocoder.js'],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
  },
  output: {
    path: __dirname + '/lib',
    filename: 'google-maps-geocoder.js',
    libraryTarget: 'umd'
  }
};
