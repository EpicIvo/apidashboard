import Site from '../models/Site';

class SitesController {

  static find() {
    return new Promise((resolve, reject) => {

      Site.find({}, (err, sites) => {

        if(!err) {
          resolve(sites);
        }
        else {
          reject(err);
        }
      });
    });
  }

  static findByPlatform(platform_id) {
    return new Promise((resolve, reject) => {

      Site.find({ platform: platform_id }, (err, sites) => {

        if(!err) {
          resolve(sites);
        }
        else {
          reject(err);
        }
      });
    });
  }

  static findOne(id) {
    return new Promise((resolve, reject) => {

      Site.findById(id, (err, site) => {

        if(!err) {
          resolve(site);
        }
        else {
          reject(err);
        }
      });
    });
  }

  static save(site) {
    return new Promise((resolve, reject) => {

      Site.update({ _id: site._id }, { $set: {
        project: site.project,
        slug: site.slug,
        paths: site.paths,
        domains: site.domains,
      }}, ((err, res) => {

        if (!err) {
          resolve(res);
        }
        else {
          reject(err);
        }
      }));
    });
  }
}

export default SitesController;
