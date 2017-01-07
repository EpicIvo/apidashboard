import express from 'express';
import prerenderMiddleware from 'prerender-node';
import path from 'path';
import workableEndpoint from './workableEndpoint';
import geoip from 'geoip-lite';

prerenderMiddleware.set('prerenderServiceUrl', 'http://localhost:3000/');

const app = express();

app.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'];
    if (ip){
        let ipList = ip.split(',');
        ip = ipList[ipList.length-1];
    } else {
        ip = req.connection.remoteAddress;
    }

    const location = geoip.lookup(ip);

    if(req.query.debug){
        res.json({ip: ip, location});
    }
    else if(!location || location.country != 'NL') {
        res.redirect('/en');
    }
    else {
        res.redirect('/nl');
    }
});

app.use(prerenderMiddleware);
app.get('/workable', workableEndpoint);
app.use(express.static(`${__dirname}/../public`));
app.use((req, res) => {
    return res.sendFile(path.resolve('public/index.html'));
});

app.enable('trust proxy');

const port = process.env.PORT || 4000;
app.listen(port);
