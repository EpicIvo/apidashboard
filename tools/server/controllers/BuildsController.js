import Build from '../models/Builds';

class BuildsController {

    static find() {

        return new Promise((resolve, reject) => {

            Build.find({}, (err, builds) => {

                if (!err) {
                    resolve(builds);
                }
                else {
                    reject(err);
                }
            });
        });
    }

    static findByPlatform(platform_id) {

        return new Promise((resolve, reject) => {

            Build.find({platform_id: platform_id}, (err, builds) => {

                if (!err) {
                    resolve(builds);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}

export default BuildsController;