const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

const isDev = (process.env.NODE_ENV === 'development');

// plugin that stores the chunkhash on a json file
const assetsPluginInstance = new AssetsPlugin({
  filename: 'assets.json',
  path: path.join(__dirname, (isDev
    ? 'lib'
    : '.dist'), 'server')
});

// plugins per environment
const plugins = [assetsPluginInstance];

if (!isDev) {
  plugins.push(new webpack.LoaderOptionsPlugin({minimize: true, debug: false}));
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    compress: {
      screw_ie8: true
    },
    comments: false
  }));
}

// babel trnaspile config
const babelConfig = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader?cacheDirectory=true',
    options: {
      presets: [
        'es2017',
        'stage-0',
        [
          'env', {
            targets: [
              {
                name: 'ie',
                version: '>=10'
              }, {
                name: 'edge',
                version: '>=12'
              }, {
                name: 'firefox',
                version: '>=45'
              }, {
                name: 'chrome',
                version: '>=45'
              }, {
                name: 'safari',
                version: '>=7'
              }
            ]
          }
        ]
      ]
    }
  }
};

// webpack config
module.exports = {
  target: 'web',
  entry: {
    main: [
      'babel-polyfill', './lib/client/js/main.js'
    ],
    index: ['./lib/client/js/index.js']
  },
  output: {
    path: path.join(__dirname, '.dist/client/js'),
    filename: '[name].[chunkhash].bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [babelConfig]
  },
  plugins
};
