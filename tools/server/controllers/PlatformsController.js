import Platforms from '../models/Platforms';

class PlatformsController {

    static find() {
        return (req, res) => {
            Platforms.find({}, (err, platforms) => {
                return res.end(JSON.stringify({platforms: platforms}));
            });
        };
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