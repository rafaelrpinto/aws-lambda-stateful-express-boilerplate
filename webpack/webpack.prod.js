const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const babelConfig = require('./babel-config');

const assetsPluginInstance = new AssetsPlugin({
  filename: 'assets.json',
  path: path.join(__dirname, '../', '.dist')
});

module.exports = {
  entry: [
    'babel-polyfill', './lib/public/js/main.js', './lib/public/js/index.js'
  ],
  output: {
    path: path.join(__dirname, '../.dist/public/js'),
    filename: '[name].[hash].bundle.js'
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
    }),
    assetsPluginInstance
  ],
  module: {
    rules: [babelConfig]
  }
};
