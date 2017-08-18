const Merge = require('webpack-merge');
const ProdConfig = require('./webpack.prod.js');
const path = require('path');

module.exports = Merge(ProdConfig, {
  entry: {
    'react-wavesurfer': './src/react-wavesurfer'
  },
  output: {
    path: path.join(__dirname, '../lib'),
    library: ['Wavesurfer'],
    filename: '[name].js',
    libraryTarget: 'umd'
  }
});
