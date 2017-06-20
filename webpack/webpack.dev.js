const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const babelConfig = require('./babel-config');

const assetsPluginInstance = new AssetsPlugin({
  filename: 'assets.json',
  path: path.join(__dirname, '../', 'lib')
});

module.exports = {
  entry: [
    'babel-polyfill', './lib/public/js/main.js', './lib/public/js/index.js'
  ],
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../.dist/public/js')
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [babelConfig]
  },
  plugins: [assetsPluginInstance]
};
