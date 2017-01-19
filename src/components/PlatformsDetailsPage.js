import React, { Component } from 'react';
import appVars from '../config/appVars';
import PlatformService from '../services/PlatformService';

class PlatformsDetailsPage extends Component {

  constructor() {

    super();

    this.state = {
      platform: null
    };

    this.Platform = new PlatformService();
  }

  componentDidMount() {

    const id = this.props.params.id;

    this.Platform.getById(id)
      .then((res) => {
        this.Platform.getBuilds(id).then((r) => {
          res.platform.builds = r.builds;
          this.setState({ platform: res.platform });
        });
      });
  }

  render() {
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Branch</th>
            <th>Gitlab url</th>
            <th>Gallery</th>
          </tr>
          </thead>
          <tbody>
          { this.state.platform && this.state.platform.builds.map((build) => <tr key={build._id}>
            <td>{build.ref}</td>
            <td>{build.branch}</td>
            <td>
              <a href={appVars.urls.gitlab + this.state.platform.slug + '/builds/' + build.ref} target="_blank">View build on Gitlab</a>
            </td>
            <td>
              <a href={`/build/${build._id}`}>View build</a>
            </td>
          </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlatformsDetailsPage;
