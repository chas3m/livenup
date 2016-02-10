import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import routes from './routes';

//devToolsExtension adds chrome dev tools to browser
const reduxRouterMiddleware = syncHistory(hashHistory);
const createStoreWithMiddleware = compose(applyMiddleware(ReduxPromise, reduxRouterMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>, document.querySelector('.root'));
