const path =  require('path');
const webpack =  require('webpack');

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    './example/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/src/'
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    modulesDirectories: ['node_modules', '../src'],
    extensions: ['', '.js', '.jsx']
  },

  module: {
    preLoaders: [
      {
        test:    /\.jsx?/,
        exclude: /node_modules|lib/,
        loaders: ['eslint', 'jscs'],
        include: path.join(__dirname, '../')
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, '../')
      },
      {
        test: require.resolve("wavesurfer.js"),
        loader: "expose?WaveSurfer"
      }
    ]
  }
};
