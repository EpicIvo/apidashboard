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
}

export default SitesController;
