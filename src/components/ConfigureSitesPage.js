import React, { Component } from 'react';
import { Link } from 'react-router';
import appVars from '../config/appVars';
// import SiteService from '../services/sites';
//TODO : Transform to single site fetch
class ConfigureSitesPage extends Component {

    constructor() {

        super();

        this.state = {
            site: null
        };

        this.Platform = new PlatformService();
    }

    componentDidMount() {

        const id = this.props.params.id;

        this.Platform.getSites(id).then((r) => {
            this.setState({sites: r.sites});
        });
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="active" data-toggle="tab"><a href="#site">Site</a></li>
                    <li data-toggle="tab"><a href="#domains">Domains</a></li>
                    <li data-toggle="tab"><a href="#paths">Paths</a></li>
                </ul>
                { this.state.sites && <div className="tab-content">
                    <div id="site" className="tab-pane fade active">
                        <h3>Site</h3>
                        <span>{this.state.sites[0].project}</span>
                    </div>
                    <div id="domains" className="tab-pane fade">
                        <h3>Site</h3>
                    </div>
                    <div id="paths" className="tab-pane fade">
                        <h3>Site</h3>
                    </div>
                </div> }
            </div>
        );
    }
}

export default ConfigureSitesPage;