import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Immutable from 'seamless-immutable';

import {
  LOAD_CUSTOMERS,
  LOAD_CUSTOMERS_ERROR,
} from '../actions';

export const INITIAL_STATE = {
  reducer: {
    customers: [],
  },
};

export const reducer = (state = Immutable(INITIAL_STATE), action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CUSTOMERS: return state.set('customers', payload);
    case LOAD_CUSTOMERS_ERROR: return state.set('error', payload);
    default: return state;
  }
};

export default combineReducers({ reducer, router: routerReducer });
