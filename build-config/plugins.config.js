const path =  require('path');
const webpack =  require('webpack');

module.exports = {
    entry: {
      'plugins/regions': './src/plugins/regions',
      'plugins/timeline': './src/plugins/timeline'
    },

    output: {
        path: path.join(__dirname, '../lib'),
        library: ['ReactWavesurfer', '[name]'],
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel-loader'}
      ]
    },

    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    externals: [
      {
        'react': {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        },
        'wavesurfer.js': {
          root: 'WaveSurfer',
          commonjs2: 'wavesurfer.js',
          commonjs: 'wavesurfer.js',
          amd: 'wavesurfer'
        },
        'wavesurfer': {
          root: 'WaveSurfer',
          commonjs2: 'wavesurfer.js',
          commonjs: 'wavesurfer.js',
          amd: 'wavesurfer'
        }
      }
    ],

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
};
