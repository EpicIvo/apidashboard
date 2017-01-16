import Platforms from '../models/Platforms';

class PlatformsController {

    static find() {
        return new Promise((resolve, reject) => {

            Platforms.find((err, platforms) => {

                if (!err) {
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

            Platforms.findById(id, (err, platform) => {

                if (!err) {
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