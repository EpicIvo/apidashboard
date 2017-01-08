import Platforms from '../models/Platforms';

class PlatformsController {

    static find() {
        return (req, res) => {
            Platforms.find({}, (err, platforms) => {
                return res.end(JSON.stringify({platforms: platforms}));
            });
        };
    }
}

export default PlatformsController;