import path from 'path';
import { Server} from 'http';
import Express  from 'express';
import React from 'react';
import 'isomorphic-fetch';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/router';
import routes from '../client/components/Routes/routes';
import NotFoundPage from '../client/components/NotFoundPage';

const mongoUri = 'mongodb://wraith_user:dMqpsqxoB7tRwBZAZPnrhoDp@ds055862.mlab.com:55862/wraith';

mongoose.connect(mongoUri);

const app = new Express();
const server = new Server(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {

    if (!req.accepts('json')) {
        return res.status(400).json({message: 'Accepted format is application/json'});
    }
    next();
});

app.use(Express.static(path.join(__dirname, 'dist')));

app.use('/v1/', router);

app.get('*', (req, res) => {
    match(
        { routes, location: req.url },
        (err, redirectLocation, renderProps) => {

            if (err) {
                return res.status(500).send(err.message);
            }

            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            let markup;

            if (renderProps) {
                markup = renderToString(<RouterContext {...renderProps} />);
            }
            else {
                markup = renderToString(<NotFoundPage/>);
                res.status(404);
            }
            return res.render('index', { markup });
        }
    );
});

server.listen(process.env.PORT || 3000, function () {

    let port = server.address().port;
    console.log('App now running on port', port);
});