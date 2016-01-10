const path =  require('path');
const webpack =  require('webpack');

module.exports = {
    entry: {
      basic: './src/react-wavesurfer',
      regions: './src/react-wavesurfer-regions'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        library: 'ReactWavesurfer',
        filename: '[name].react-wavesurfer.js',
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
        }
      }
    ],

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
};
