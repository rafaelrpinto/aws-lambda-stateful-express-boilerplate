const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: ['./lib/public/js/main.js', './lib/public/js/index.js'],
  output: {
    path: path.join(__dirname, './.dist/public/js'),
    filename: 'main.js',
    publicPath: 'static',
    sourceMapFilename: '[name].map'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
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
  ]
};
