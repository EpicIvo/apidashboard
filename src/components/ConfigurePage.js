import React, { Component } from 'react';
import { Link } from 'react-router';
import appVars from '../config/appVars';
import PlatformService from '../services/platforms';

class ConfigurePage extends Component {

    constructor() {

        super();

        this.state = {
            sites: null
        };

        this.Platform = new PlatformService();
    }

    componentDidMount() {

        const id = this.props.params.id;

        this.Platform.getSites(id).then((res) => {
            this.setState({sites: res.sites});
        });
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
                        <td>{site.name}</td>
                        <td><Link to={'/configure/site/' + site._id} >Configure</Link></td>
                    </tr> )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ConfigurePage;