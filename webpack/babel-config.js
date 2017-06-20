module.exports = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        'es2017',
        'stage-2',
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
