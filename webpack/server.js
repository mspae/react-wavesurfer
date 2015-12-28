import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

const host = 'localhost';
const port = 3000;

const options = {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
};

const compiler = webpack(config);
const webpackDevServer = new WebpackDevServer(compiler, options);

webpackDevServer.listen(port, host, () => {
  console.log('Webpack development server listening on %s:%s', host, port);
});
