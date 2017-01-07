import React, { Component } from 'react';
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
                this.setState({platforms: res.platforms});
            });
    }

    render() {
        return (
            <div>
                <h1>Platforms</h1>
                { this.state.platforms.map((platform) => <span key={platform._id}>{platform.name}</span> )}
            </div>
        );
    }
}

export default PlatformsOverviewPage;