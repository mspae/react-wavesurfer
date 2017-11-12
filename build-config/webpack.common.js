const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
      path: path.resolve(__dirname, '..', 'lib')
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
      rules: [
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
  }
};