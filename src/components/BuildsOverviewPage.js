import React, { Component } from 'react';
import appVars from '../config/appVars';
import BuildsService from '../services/builds';
import PlatformService from '../services/platforms';

class BuildsOverviewPage extends Component {

    constructor() {

        super();

        this.state = {
            builds: null
        };

        this.Build = new BuildsService();
        this.Platform = new PlatformService();
    }

    componentDidMount() {

        this.Build.get()
            .then((res) => {
                let promises = [];
                res.builds.map((build) => {
                    promises.push(new Promise((resolve) => {
                        this.Platform.getById(build.platform_id).then((r) => {
                            build.platform = r.platform;
                            resolve();
                        });
                    }));
                });
                Promise.all(promises).then(() => {
                    this.setState({builds: res.builds});
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
                        <th>Platform</th>
                        <th>Branch</th>
                        <th>Gallery</th>
                        <th>Date</th>
                        <th>Built by</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.builds && this.state.builds.map((build) => <tr key={build._id}>
                        <td>{build.ref}</td>
                        <td>{build.platform && build.platform.name}</td>
                        <td>{build.branch}</td>
                        <td>
                            <a href={appVars.urls.gallery + build.ref + '/gallery.html'} target="_blank">View gallery</a>
                        </td>
                        <td>{new Date(build.timestamp).toDateString()}</td>
                        <td>{build.built_by}</td>
                    </tr> )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BuildsOverviewPage;