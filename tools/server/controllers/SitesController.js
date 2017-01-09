import Sites from '../models/Sites';

class SitesController {

    static find() {
        return (req, res) => {
            Sites.find({}, (err, sites) => {
                return res.end(JSON.stringify({sites: sites}));
            });
        };
    }

    static findByPlatform(platform_id) {
        return new Promise((resolve, reject) => {

            Sites.find({platform: platform_id}, (err, sites) => {

                if (!err) {
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

            Sites.findById(id, (err, site) => {

                if (!err) {
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