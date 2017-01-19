import Commit from '../models/Commits';

class CommitsController {

  static findByPlatform(platform_id) {
    return (req, res) => {
      Commit.find({ platform: platform_id }, (err, commits) => {
        return res.end(JSON.stringify({ commits: commits }));
      });
    };
  }
}

export default CommitsController;
