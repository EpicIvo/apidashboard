import express from 'express';
import BuildsController from '../controllers/BuildsController';
import PlatformsController from '../controllers/PlatformsController';
import SitesController from '../controllers/SitesController';

const router = express.Router();

router.route('/platforms')

  .get(function (req, res) {

    PlatformsController
      .find()
      .then((platforms) => {
        res.end(JSON.stringify({ platforms: platforms }));
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/platforms/:id')

  .get(function (req, res) {

    PlatformsController
      .findOne(req.params.id)
      .then((platform) => {
        res.end(JSON.stringify({ platform: platform }));
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/platforms/:id/sites')

  .get((req, res) => {

    SitesController
      .findByPlatform(req.params.id)
      .then((sites) => {
        res.end(JSON.stringify({ sites: sites }));
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/builds')

  .get((req, res) => {

    BuildsController
      .find()
      .then((builds) => {
        res.end(JSON.stringify({ builds: builds }));
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/build/:id')

  .get((req, res) => {

    BuildsController
      .findOne(req.params.id)
      .then(build => {
        res.end(JSON.stringify({ build }));
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/platforms/:id/builds')

  .get((req, res) => {

    BuildsController
      .findByPlatform(req.params.id)
      .then((builds) => {
        res.end(JSON.stringify({ builds: builds }));
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/sites')

  .get((req, res) => {

    SitesController
      .find()
      .then((sites) => {
        res.end(JSON.stringify({ sites: sites }));
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.route('/sites/:id')

  .get((req, res) => {

    SitesController
      .findOne(req.params.id)
      .then((site) => {
        res.end(JSON.stringify({ site: site }));
      })
      .catch((err) => {
        console.log(err);
      });
  })

  .post((req, res) => {

    SitesController
      .save(req.body)
      .then((r) => {
        res.end(JSON.stringify({ r }));
      })
      .catch((err) => {
          console.log(err);
      })
  });

export default router;
