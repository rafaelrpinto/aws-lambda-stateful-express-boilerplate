const path = require('path');
const babelConfig = require('./babel-config');

module.exports = {
  entry: [
    'babel-polyfill', './lib/public/js/main.js', './lib/public/js/index.js'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../.dist/public/js')
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [babelConfig]
  }
};
