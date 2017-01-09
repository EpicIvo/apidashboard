import React, { Component } from 'react';
import { Link } from 'react-router';
import PlatformService from '../services/platforms';

class PlatformsOverviewPage extends Component {

    constructor() {

        super();

        this.state = {
            platforms: []
        };

        this.Platform = new PlatformService();
    }

    componentDidMount() {

        this.Platform.get()
            .then((res) => {
                res.platforms.map((platform) => {
                    this.Platform.getBuilds(platform._id).then((r) => {
                        platform.builds = r.builds;
                    });
                });
                this.setState({platforms: res.platforms});
            });
    }

    render() {
        const gitlabBase = 'https://gitlab.com/burstdigital/';
        return (
            <div>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Builds</th>
                        <th>Gitlab url</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.platforms.map((platform) => <tr key={platform._id}>
                        <td>{platform._id}</td>
                        <td>{platform.name}</td>
                        <td>
                            <Link to={ "/platforms/" + platform._id } >View builds</Link>
                        </td>
                        <td><a href={gitlabBase + platform.slug} target="_blank">{gitlabBase + platform.slug}</a></td>
                    </tr> )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PlatformsOverviewPage;