import express from 'express';
import path from 'path';
import router from './server/routes/router';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 4000;

const mlab_url = process.env.MONGODB_URI || 'mongodb://localhost/vtm';
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1', router);
app.use(express.static(`${__dirname}/../public`));
app.use((req, res) => {
    return res.sendFile(path.resolve('public/index.html'));
});

app.listen(port);
