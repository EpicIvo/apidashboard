import React, { Component } from 'react';
import PlatformService from '../services/platforms';
import CommitService from '../services/commits';

class PlatformsOverviewPage extends Component {

    constructor() {

        super();

        this.state = {
            platforms: []
        };

        this.Platform = new PlatformService();
        this.Commit = new CommitService();
    }

    componentDidMount() {

        this.Platform.get()
            .then((res) => {
                res.platforms.map((platform) => {
                    this.Platform.getCommits(platform._id).then((r) => {
                        platform.commits = r.commits;
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
                        <th>Gitlab url</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.platforms.map((platform) => <tr key={platform._id}>
                        <td>{platform._id}</td>
                        <td>{platform.name}</td>
                        <td><a href={gitlabBase + platform.slug} target="_blank">{gitlabBase + platform.slug}</a></td>
                    </tr> )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PlatformsOverviewPage;