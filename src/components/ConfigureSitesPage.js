import React, { Component } from 'react';
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
      this.setState({ site: res.site });
    });
  }

  handleChange(event) {

    const property = event.target.getAttribute('data-type');
    const key = event.target.getAttribute('data-key');

    const updated = update(this.state.site, {
      [property]: {
        [key]: { $set: event.target.value }
      }
    });

    this.setState({ site: updated });
    console.log(updated);
  }

  addPath() {

    let site = this.state.site;

    site.paths.push([]);
    this.setState({ site: site });
  }

  addDomain() {

    let site = this.state.site;
    site.domains.push([]);
    this.setState({ site: site });
  }

  render() {
    console.log(this.state.site);
    return (
      <div>
        { this.state.site && <div>
          <div>
            <h3>Site <span className="btn btn-success">Save site</span></h3>
            <input type="text" className="form-control" defaultValue={this.state.site.project} />
          </div>
          <div>
            <h3>Domains <span className="btn btn-primary" onClick={() => this.addDomain()}>Add domain</span>
            </h3>
            { this.state.site.domains.map((domain, index) => <div key={index}>
                <input type="text" className="form-control domain" data-type="domains" data-key={index} value={domain} onChange={this.handleChange} />
              </div>
            )}
          </div>
          <div>
            <h3>Paths <span className="btn btn-primary" onClick={() => this.addPath()}>Add domain</span>
            </h3>
            { this.state.site.paths.map((path, index) => <div key={index}>
                <input type="text" className="form-control" data-type="paths" data-key={index} value={path} onChange={this.handleChange} />
              </div>
            )}
          </div>
        </div> }
      </div>
    );
  }
}

export default ConfigureSitesPage;
