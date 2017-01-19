import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';
import express from 'express';
import router from './server/routes/router';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const mongo_dev = 'mongodb://localhost/vtm';
const app = express();
const port = process.env.PORT || 3000;
const mlab_url = process.env.MONGODB_URI || mongo_dev;
const mlab_options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};

mongoose.Promise = Promise;
mongoose.connect(mlab_url, mlab_options);

const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1', router);
app.use(historyApiFallback());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  quiet: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
}));
app.use(webpackHotMiddleware(compiler));
app.listen(port);
