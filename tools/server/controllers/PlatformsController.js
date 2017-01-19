import Platform from '../models/Platform';

class PlatformsController {

  static find() {
    return new Promise((resolve, reject) => {

      Platform.find((err, platforms) => {

        if(!err) {
          resolve(platforms);
        }
        else {
          reject(err);
        }
      });
    });
  }

  static findOne(id) {
    return new Promise((resolve, reject) => {

      Platform.findById(id, (err, platform) => {

        if(!err) {
          resolve(platform);
        }
        else {
          reject(err);
        }
      });
    });
  }
}

export default PlatformsController;
