import React, { Component } from 'react';
import appVars from '../config/appVars';
import moment from 'moment';
import BuildsService from '../services/BuildService';
import PlatformService from '../services/PlatformService';
import SiteService from '../services/SiteService';

class BuildDetailPage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      build: null
    };

    this.Build = new BuildsService();
    this.Platform = new PlatformService();
    this.Site = new SiteService();
  }

  componentDidMount() {
    this.Build.getById(this.props.routeParams.id)
      .then(res => {
        console.log(res);
        this.Platform.getById(res.build.platform_id).then(r => {
          res.build.platform = r.platform;
        })
          .then(() => this.setState({ build: res.build }));
      });
  }

  render() {
    const build = this.state.build;
    if(!build) {
      return null;
    }
    return (
      <div key={build._id}>
        <ul>

          <li>{build.ref}</li>
          <li>{build.platform && build.platform.name}</li>
          <li>{build.branch}</li>
          <li>
            Site galleries
            <ul>
              {console.log(build)}
              {/*<a href={`${appVars.gallery}/${build.ref}/${site.ref}/gallery.html`} target="_blank">View gallery</a>*/}
            </ul>
          </li>
          <li>{moment(build.timestamp).fromNow()}</li>
          <li>{moment(build.timestamp).format('HH:mm DD-MM-YYYY')}</li>
          <li>{build.built_by}</li>
        </ul>
      </div>
    );
  }
}

BuildDetailPage.propTypes = {
  routeParams: React.PropTypes.object.isRequired
};

export default BuildDetailPage;
