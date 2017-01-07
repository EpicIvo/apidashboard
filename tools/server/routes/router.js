import express from 'express';
import Platforms from '../models/Platforms';
import Sites from '../models/Sites';

const router = express.Router();

router.use('/platforms/:id', function(req, res, next) {

    Platforms.findById(req.params.id, function(err, platform) {

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

        let base = 'https://wraith-dashboard.burst-digital.com/v1/platforms/';

        Platforms.find(function (err, platforms) {

            if (err) {
                return res.send(err);
            }

            let start = req.query.start !== undefined ? parseInt(req.query.start) : null;
            let limit = req.query.limit !== undefined ? parseInt(req.query.limit) : null;

            let pagination = {
                currentPage: (limit !== null && start !== null) ? Math.ceil(start / limit) : 1,
                currentItems: limit !== null ? limit : platforms.length,
                totalPages: limit !== null ? Math.ceil(platforms.length / limit) - 1 : 1
            };

            let json = {
                items: [],
                _links: {
                    self: {
                        href: base
                    }
                },
                pagination: {
                    currentPage: pagination.currentPage,
                    currentItems: pagination.currentItems,
                    totalPages: pagination.totalPages,
                    totalItems: platforms.length,
                    _links: {
                        first: {
                            page: 1,
                            href: base + (limit ? '?limit=' + limit : '')
                        },
                        last: {
                            page: pagination.totalPages,
                            href: base + '?start=' + (limit ? (platforms.length + 1) - limit : 0) + '&limit=' + (limit || 5)
                        },
                        previous: {
                            page: pagination.currentPage - 1,
                            href: base + '?start=' + (start >= pagination.currentItems ? start - pagination.currentItems : 0) + '&limit=' + (limit || 0)
                        },
                        next: {
                            page: pagination.currentPage + 1,
                            href: base + '?start=' + (start + pagination.currentItems) + '&limit=' + (limit || 0)
                        }
                    }
                }

            };

            for (let i = start || 0, length = platforms.length, l = 0; i < length && (limit !== null ? l < limit : 1); i++, l++) {

                let platform = platforms[i];

                json.items.push({
                    item: platform,
                    _links: {
                        self: {
                            href: base + platform._id
                        },
                        collection: {
                            href: base
                        }
                    }
                });
            }

            res.status(200).json(json);
        });
    })

    .post(function (req, res) {

        console.log('body', req.body);

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

        let base = 'https://mern-dev.herokuapp.com/v1/platforms/';

        let platform = req.platform.toJSON();

        let json = {
            item: platform,
            _links: {
                self: {
                    href: base + platform._id
                },
                collection: {
                    href: base
                }
            }
        };

        res.status(200).json(json);
    })

    .put(function (req, res) {

        console.log('body', req.body);
        console.log('req', req.platform);
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
        }, function (err, platform) {

            if (err) {
                return res.send(err);
            }

            res.status(204).json({message: 'platform deleted'});
        });
    });

export default router;