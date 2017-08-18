const Merge = require('webpack-merge');
const ProdConfig = require('./webpack.prod.js');
const path = require('path');

module.exports = Merge(ProdConfig, {
  entry: {
    'plugins/regions': './src/plugins/regions',
    'plugins/timeline': './src/plugins/timeline',
    'plugins/minimap': './src/plugins/minimap'
  },

  output: {
    path: path.join(__dirname, '../lib'),
    library: ['Wavesurfer', '[name]'],
    filename: '[name].js',
    libraryTarget: 'umd'
  }
});
