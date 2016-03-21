const path =  require('path');
const webpack =  require('webpack');

module.exports = {
  devtool: 'eval',

  entry: [
    './example/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/src/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
    //new webpack.NoErrorsPlugin()
  ],

  resolve: {
    modulesDirectories: ['node_modules', '../src'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      'wavesurfer': path.join(__dirname, '../node_modules/wavesurfer.js/dist/wavesurfer.min.js')
    }
  },

  eslint: {
    configFile: './.eslintrc',
    quiet: false,
    failOnWarning: true,
    failOnError: true
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader'], include: path.join(__dirname, '../') },
      { test: /\.js$/, loader: 'eslint-loader', exclude: /[node_modules|vendor]/ }
    ]
  }
};
