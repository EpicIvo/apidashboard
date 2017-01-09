import Build from '../models/Builds';

class BuildsController {

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