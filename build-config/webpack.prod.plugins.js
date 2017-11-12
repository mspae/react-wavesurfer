const Merge = require('webpack-merge');
const ProdConfig = require('./webpack.prod.js');
const path = require('path');

module.exports = Merge(ProdConfig, {
  entry: {
    'plugins/regions': './src/plugins/regions.tsx',
    'plugins/timeline': './src/plugins/timeline.tsx',
    'plugins/minimap': './src/plugins/minimap.tsx'
  },

  output: {
    path: path.join(__dirname, '../lib'),
    library: ['Wavesurfer', '[name]'],
    filename: '[name].js',
    libraryTarget: 'umd'
  }
});
