// // This file configures the development web server
// // which supports hot reloading and synchronized testing.
//
// // Require Browsersync along with webpack and middleware for it
// import browserSync from 'browser-sync';
// import historyApiFallback from 'connect-history-api-fallback';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import config from '../webpack.config.dev';
// import PlatformsController from './server/controllers/PlatformsController';
// import CommitsController from './server/controllers/CommitsController';
// import mongoose from 'mongoose';
// // Required for react-router browserHistory
// // see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
//
// const bundler = webpack(config);
// const mongoUri = 'mongodb://wraith_user:dMqpsqxoB7tRwBZAZPnrhoDp@ds055862.mlab.com:55862/wraith';
//
// mongoose.Promise = Promise;
// mongoose.connect(mongoUri);
//
// // Run Browsersync and use middleware for Hot Module Replacement
// browserSync({
//     port: 3000,
//     ui: {
//         port: 3001
//     },
//     open: false,
//     server: {
//         baseDir: 'src',
//
//         middleware: [
//             {
//                 route: '/v1/platforms/:id/commits',
//                 handle: (req) => {
//
//                     const id = req.params.id;
//                     console.log(id);
//                     CommitsController.findByPlatform(id);
//                 }
//             },
//             {
//                 route: '/v1/platforms',
//                 handle: PlatformsController.find()
//             },
//             historyApiFallback(),
//
//
//             webpackDevMiddleware(bundler, {
//                 // Dev middleware can't access config, so we provide publicPath
//                 publicPath: config.output.publicPath,
//
//                 // These settings suppress noisy webpack output so only errors are displayed to the console.
//                 noInfo: false,
//                 quiet: false,
//                 stats: {
//                     assets: false,
//                     colors: true,
//                     version: false,
//                     hash: false,
//                     timings: false,
//                     chunks: false,
//                     chunkModules: false
//                 },
//
//                 // for other settings see
//                 // http://webpack.github.io/docs/webpack-dev-middleware.html
//             }),
//
//             // bundler should be the same as above
//             webpackHotMiddleware(bundler)
//         ]
//     },
//
//     // no need to watch '*.js' here, webpack will take care of it for us,
//     // including full page reloads if HMR won't work
//     files: [
//         'src/*.html'
//     ]
// });

import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

import express from 'express';
import path from 'path';
import router from './server/routes/router';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const mongoUri = 'mongodb://wraith_user:dMqpsqxoB7tRwBZAZPnrhoDp@ds055862.mlab.com:55862/wraith';
const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(mongoUri);

const compiler = webpack(config);

app.use(bodyParser.urlencoded({extended: true}));
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