import React, { Component } from 'react';
import { Link } from 'react-router';
import PlatformService from '../services/PlatformService';

class ConfigurePage extends Component {

  constructor() {

    super();

    this.state = {
      sites: null,
      platforms: null
    };
    this.Platform = new PlatformService();
  }

  componentDidMount() {

    const id = this.props.params.id;

    if(id) {
      this.Platform.getSites(id).then((res) => {
        this.setState({ sites: res.sites });
      });
    }
    else {
      this.Platform.get().then((res) => {
        this.setState({ platforms: res.platforms });
      });
    }
  }

  render() {
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Configure</th>
          </tr>
          </thead>
          <tbody>
          { this.state.sites && this.state.sites.map((site) => <tr key={site._id}>
            <td>{site.project}</td>
            <td><Link to={'/configure/site/' + site._id}>Configure</Link></td>
          </tr>)}
          { this.state.platforms && this.state.platforms.map((platform) => <tr key={platform._id}>
            <td>{platform.name}</td>
            <td><Link to={'/configure/' + platform._id}>Configure</Link></td>
          </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ConfigurePage;
