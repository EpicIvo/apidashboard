import React, {Component} from 'react';
import update from 'react-addons-update';
import SiteService from '../services/SiteService';

class ConfigureSitesPage extends Component {

  constructor() {

    super();

    this.state = {
      site: null
    };

    this.Site = new SiteService();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    const id = this.props.params.id;

    this.Site.getById(id).then((res) => {
      this.setState({site: res.site});
    });
  }

  handleChange(event) {

    const property = event.target.getAttribute('data-type');
    const key = event.target.getAttribute('data-key');

    let updated;

    if (key) {
      updated = update(this.state.site, {
        [property]: {
          [key]: {$set: event.target.value}
        }
      });
    }
    else {
      updated = update(this.state.site, {
        [property]: {$set: event.target.value}
      });
    }

    this.setState({site: updated});
  }

  addPath() {

    let site = this.state.site;

    site.paths.push([]);
    this.setState({site: site});
  }

  addDomain() {

    let site = this.state.site;
    site.domains.push([]);
    this.setState({site: site});
  }

  saveSite() {

    let site = this.state.site;

    this.Site.save(site).then((res) => {
      console.log(res);
    });
  }

  remove() {

    //TODO : Remove either domain or path
  }

  render() {
    return (
      <div>
        { this.state.site && <div>
          <div>
            <h3>Site <span className="btn btn-success" onClick={() => this.saveSite()}>Save site</span></h3>
            <input type="text" className="form-control" data-type="project" value={this.state.site.project}
                   onChange={this.handleChange}/>
          </div>
          <div>
            <h3>Domains <span className="btn btn-primary" onClick={() => this.addDomain()}>Add domain</span>
            </h3>
            { this.state.site.domains.map((domain, index) => <div className="input-group" key={index}>
                <input type="text" className="form-control domain" data-type="domains" data-key={index} value={domain}
                       onChange={this.handleChange}/>
                <span className="input-group-addon btn btn-danger" onClick={() => this.remove()}>Remove</span>
              </div>
            )}
          </div>
          <div>
            <h3>Paths <span className="btn btn-primary" onClick={() => this.addPath()}>Add domain</span>
            </h3>
            { this.state.site.paths.map((path, index) => <div key={index}>
                <input type="text" className="form-control" data-type="paths" data-key={index} value={path}
                       onChange={this.handleChange}/>
              </div>
            )}
          </div>
        </div> }
      </div>
    );
  }
}

ConfigureSitesPage.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default ConfigureSitesPage;
