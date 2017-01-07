import mongoose from 'mongoose';
import Platforms from '../models/Platforms';

mongoose.Promise = Promise;
mongoose.connect('mongodb://wraith_user:dMqpsqxoB7tRwBZAZPnrhoDp@ds055862.mlab.com:55862/wraith');

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