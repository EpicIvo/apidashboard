import express from 'express';
import Platform from '../models/Platforms';
import Commit from '../models/Commits';
import BuildsController from '../controllers/BuildsController';
import PlatformsController from '../controllers/PlatformsController';
import SitesController from '../controllers/SitesController';

const router = express.Router();

router.use('/platforms/:id', function(req, res, next) {

    Platform.findById(req.params.id, function(err, platform) {

        if (err) {
            return res.send(err);
        }

        if (platform !== null) {

            req.platform = platform;
            next();
        }
        else {
            return res.status(404).json({message: 'not found'});
        }
    });
});

router.route('/platforms')

    .options(function (req, res) {

        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        return res.status(200).send();
    })

    .delete(function (req, res) {

        return res.status(400).send();
    })

    .get(function (req, res) {

        Platform.find(function (err, platforms) {

            if (err) {
                return res.send(err);
            }

            let json = {
                platforms: platforms
            };

            res.status(200).json(json);
        });
    })

    .post(function (req, res) {

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: 'empty fields' });
        }
        else {
            let platform = new Platform();

            platform.name = req.body.name || req.body.item.name;

            if (!platform.name) {
                return res.status(400).send();
            }

            platform.save(function (err) {

                if (err) {
                    res.send(err);
                }
                res.status(201).json(platform);
            });
        }
    });

router.route('/platforms/:id')

    .options(function (req, res) {

        res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        res.header('Accept', 'application/json');
        res.status(200).send();
    })

    .post(function (req, res) {

        return res.status(400).send();
    })

    .get(function (req, res) {

        PlatformsController
            .findOne(req.params.id)
            .then((platform) => {
                res.end(JSON.stringify({platform: platform}));
            })
            .catch((err) => {
                console.log(err);
            });
    })

    .put(function (req, res) {

        if (!req.body.item.name) {
            res.status(400).json({ message: 'empty fields' });
        }
        else {

            req.platform.name = req.body.item.name;

            req.platform.save(function (err) {

                if (err) {
                    res.send(err);
                }
                else {
                    res.status(200).json(req.platform);
                }
            });
        }
    })

    .delete(function (req, res) {

        Platform.remove({
            _id: req.params.id
        }, function (err) {

            if (err) {
                return res.send(err);
            }

            res.status(204).json({message: 'platform deleted'});
        });
    });

router.route('/platforms/:id/sites')

    .get ((req, res) => {

        SitesController
            .findByPlatform(req.params.id)
            .then((sites) => {
                res.end(JSON.stringify({sites: sites}));
            })
            .catch((err) => {
                console.log(err);
            });
    });

router.route('/builds')

    .get ((req, res) => {

        BuildsController
            .find()
            .then((builds) => {
                res.end(JSON.stringify({builds: builds}));
            })
            .catch((err) => {
                console.log(err);
            });
    });

router.route('/platforms/:id/builds')

    .get ((req, res) => {

        BuildsController
            .findByPlatform(req.params.id)
            .then((builds) => {
                res.end(JSON.stringify({builds: builds}));
            })
            .catch((err) => {
                console.log(err);
            });
    });

router.route('/platforms/:id/commits')

    .options((req, res) => {

        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Accept', 'application/json');
        res.status(200).send();
    })

    .get( (req, res) => {

        Commit.find({platform: req.params.id}, (err, commits) => {

            if (err) {
                return res.send(err);
            }

            if (commits !== null) {

                let json = {
                    commits: commits,
                };

                res.status(200).json(json);
            }
            else {
                return res.status(404).json({message: 'not found'});
            }
        });
    });

export default router;