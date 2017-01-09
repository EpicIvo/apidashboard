import React, { Component } from 'react';
import appVars from '../config/appVars';
import BuildsService from '../services/builds';

class BuildsOverviewPage extends Component {

    constructor() {

        super();

        this.state = {
            builds: null
        };

        this.Build = new BuildsService();
    }

    componentDidMount() {

        this.Build.get().then((res) => {
            this.setState({builds: res.builds});
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
                        <th>Gallery</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.builds && this.state.builds.map((build) => <tr key={build._id}>
                        <td>{build.ref}</td>
                        <td>{build.branch}</td>
                        <td>
                            <a href={appVars.urls.gallery + build.ref + '/gallery.html'} target="_blank">View gallery</a>
                        </td>
                    </tr> )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BuildsOverviewPage;