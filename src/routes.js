import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import MovieDetailPage from './components/ReceiptDetailPage';
import MovieEditPage from './components/ReceiptEditPage';
import NewMoviePage from './components/NewReceiptPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="v1/receipts/:id" component={MovieDetailPage} />
    <Route path="v1/receipts/edit/:id" component={MovieEditPage} />
    <Route path="v1/new" component={NewMoviePage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
