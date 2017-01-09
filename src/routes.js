import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import PlatformsOverviewPage from './components/PlatformsOverviewPage';
import PlatformsDetailsPage from './components/PlatformsDetailsPage';
import ConfigurePage from './components/ConfigurePage';
import ConfigureSitesPage from './components/ConfigureSitesPage';
import NotFoundPage from './components/NotFoundPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="platforms" component={PlatformsOverviewPage}/>
        <Route path="platforms/:id" component={PlatformsDetailsPage}/>
        <Route path="configure/site/:id" component={ConfigureSitesPage}/>
        <Route path="configure(/:id)" component={ConfigurePage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);