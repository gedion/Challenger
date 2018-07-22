import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

let defaultState = { };
import { TOGGLE_CODE_DRAWER, SET_SELECTED_CODE_DRAWER_ITEM,
  SHOW_APP_INIT, TOGGLE_PROGRESS_BAR } from './actions';
// global appInit
let initState = _.isUndefined(window.appInit)
  ? defaultState : window.appInit;

const app = function (state, action) {
  switch (action.type) {
    case SHOW_APP_INIT:
      return action.data;
    case TOGGLE_PROGRESS_BAR:
      return Object.assign({}, state, { showProgressBar: !state.showProgressBar});
    case TOGGLE_CODE_DRAWER:
      return Object.assign({}, state, { showCodeDrawer: !state.showCodeDrawer });
    case SET_SELECTED_CODE_DRAWER_ITEM:
      let { runResult, selectedCodeDrawerItem } = action.data;
      let selectedCodeCards = _.filter(state.codeCards, { category: selectedCodeDrawerItem });
      return Object.assign({}, state, {
        showCodeDrawer: !state.showCodeDrawer,
        selectedCodeCards,
        selectedCodeDrawerItem,
        runResults: (runResult) ? _.concat(state.runResults, [runResult]) : state.Result
      });
    default:
      return state;
  }
};

// const store = createStore(app, initState, applyMiddleware(thunk));

// For development only
const store = createStore(app, initState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
  applyMiddleware(thunk)
);

export default store;
