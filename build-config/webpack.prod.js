const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = Merge(CommonConfig, {
  devtool: 'source-map',
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'prop-types': 'prop-types',
      'wavesurfer.js': {
        root: 'WaveSurfer',
        commonjs2: 'wavesurfer.js',
        commonjs: 'wavesurfer.js',
        amd: 'wavesurfer'
      }
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
