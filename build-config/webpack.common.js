const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, '..', 'lib')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMaps: true,
            presets: ['stage-0', 'es2015', 'react']
          }
        }
      },
      {
        test: [
          require.resolve(
            'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js'
          ),
          require.resolve(
            'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js'
          ),
          require.resolve('wavesurfer.js/dist/plugin/wavesurfer.regions.min.js')
        ],
        use: ['imports-loader?define=>false']
      }
    ]
  }
};
