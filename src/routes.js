import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import PlatformsOverviewPage from './components/PlatformsOverviewPage';
import NotFoundPage from './components/NotFoundPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="platforms" component={PlatformsOverviewPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);