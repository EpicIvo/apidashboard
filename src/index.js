/* eslint-disable import/default */
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './styles/styles.scss';

render(
    <Router onUpdate={() => {
        const node = document.querySelector('.transition--page[class*="-enter"');
        if (node) {
            node.scrollTop = 0;
        }
    }} history={browserHistory} routes={routes}/>, document.getElementById('app')
);