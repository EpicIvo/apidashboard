/* eslint-disable import/default */
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';

render(
    <Router history={browserHistory} routes={routes}/>, document.getElementById('app')
);