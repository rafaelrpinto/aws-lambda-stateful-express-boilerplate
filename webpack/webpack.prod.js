const path = require('path');
const webpack = require('webpack');
const babelConfig = require('./babel-config');

module.exports = {
  entry: [
    'babel-polyfill', './lib/public/js/main.js', './lib/public/js/index.js'
  ],
  output: {
    path: path.join(__dirname, '../.dist/public/js'),
    filename: 'main.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  module: {
    rules: [babelConfig]
  }
};
