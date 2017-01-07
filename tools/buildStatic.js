import request from 'request';
import pages from '../data/pages';
import mkdirp from 'mkdirp';
import fs from 'fs';

const exec = require('child_process').exec('npm run serve:public');

const paths = [];

pages.forEach(page => {
    if (page.paths) page.paths.forEach(path => paths.push(path.url));
});

console.log('Saving the following paths:', paths);

let pathsDone = 0;
setTimeout(() => {
    paths.forEach(path => {
        request('http://localhost:4000/' + path, function (error, response, body) {
            if (error || !body) {
                pathsDone++;
                console.error(error);
                console.error(response);
                return;
            }
            const dir = __dirname + '/../public/' + path;
            mkdirp.sync(dir);
            fs.writeFile(dir + '/index.html', body, function (err) {
                pathsDone++;
                if (err) {
                    console.error(err);
                }
                else {
                    console.log('The file ' + dir + '/index.html was saved!');
                }
                checkIfDone();
            });
        });
    });

}, 10000);

function checkIfDone() {
    if (pathsDone == paths.length) {
        exec.kill('SIGHUP');
        process.exit();
    }
}
