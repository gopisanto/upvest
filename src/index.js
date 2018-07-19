import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';

import './style/style.scss';

import reducer, { INITIAL_STATE } from './reducers';
import App from './components/app';

const history = createHistory();

const store = createStore(
  reducer,
  Immutable(INITIAL_STATE),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#app'),
);
