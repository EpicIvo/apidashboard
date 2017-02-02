import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage';
import ReceiptDetailPage from './components/ReceiptDetailPage';
import ReceiptEditPage from './components/ReceiptEditPage';
import NewReceiptPage from './components/NewReceiptPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="v1/receipts/:id" component={ReceiptDetailPage} />
    <Route path="v1/receipts/edit/:id" component={ReceiptEditPage} />
    <Route path="v1/new" component={NewReceiptPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
