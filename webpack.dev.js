const path = require('path');

module.exports = {
  entry: ['./lib/public/js/main.js', './lib/public/js/index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './.dist/public/js')
  },
  devtool: 'cheap-eval-source-map'
};
