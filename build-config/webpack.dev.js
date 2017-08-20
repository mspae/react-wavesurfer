const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = Merge(CommonConfig, {
  devtool: 'eval-source-map',
  entry: ['./example/index.jsx'],
  resolve: {
    alias: {
      wavesurfer: require.resolve('wavesurfer.js')
    }
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/src/'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '..')
  }
});
