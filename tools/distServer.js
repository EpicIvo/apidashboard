import express from 'express';
import path from 'path';
import router from './server/routes/router';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const mongoUri = 'mongodb://wraith_user:dMqpsqxoB7tRwBZAZPnrhoDp@ds055862.mlab.com:55862/wraith';
const app = express();
const port = process.env.PORT || 4000;

mongoose.Promise = Promise;
mongoose.connect(mongoUri);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/v1', router);
app.use(express.static(`${__dirname}/../public`));
app.use((req, res) => {
    return res.sendFile(path.resolve('public/index.html'));
});

app.listen(port);