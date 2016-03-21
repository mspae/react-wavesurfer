const path =  require('path');
const webpack =  require('webpack');

module.exports = {
    entry: {
      'react-wavesurfer': './src/react-wavesurfer',
      'plugins/regions': './src/plugins/regions'
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
      extensions: ['', '.js', '.jsx'],
      alias: {
        'wavesurfer': path.join(__dirname, '../node_modules/wavesurfer.js/dist/wavesurfer.min.js')
      }
    },

    externals: [
      {
        'react': {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        }
      }
    ],

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
};
