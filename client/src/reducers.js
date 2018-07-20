import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

let defaultState = { };

// global appInit
let initState = _.isUndefined(window.appInit)
  ? defaultState : window.appInit;

const app = function (state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(app, initState, applyMiddleware(thunk));
/*
For development only

import { compose } from 'redux';
const store = createStore(app, initState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
  applyMiddleware(thunk)
);
*/
export default store;
