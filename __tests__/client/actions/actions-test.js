
import store from './../../../client/src/reducers';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { SHOW_APP_INIT, toggleCodeDrawer,
  setDrawerListItem } from './../../../client/src/actions';

let initAppState = fs.readFileSync(path.join(__dirname, '../../../fixtures/init-app-state.json'), 'utf8');
initAppState = JSON.parse(initAppState);

describe('Tests client actions', () => {
  beforeEach(() => {
    store.dispatch({ data: initAppState, type: SHOW_APP_INIT });
  });

  it('it should toggle the code drawer', () => {
    let { dispatch } = store;
    let showCodeDrawer = _.get(store.getState(), 'showCodeDrawer');
    expect(showCodeDrawer).toBe(false);
    toggleCodeDrawer(dispatch);
    showCodeDrawer = _.get(store.getState(), 'showCodeDrawer');
    expect(showCodeDrawer).toBe(true);
    toggleCodeDrawer(dispatch);
    showCodeDrawer = _.get(store.getState(), 'showCodeDrawer');
    expect(showCodeDrawer).toBe(false);
  });

  it('it should filter selectedCodeCards but not codeCards accordingly when selectedCodeDrawerItem is modified', () => {
    let { dispatch } = store;
    let { showCodeDrawer, selectedCodeCards, codeCards } = store.getState();
    expect(selectedCodeCards).toHaveLength(3);
    expect(codeCards).toHaveLength(8);
    setDrawerListItem(dispatch, 'Code Fight Challenge');
    selectedCodeCards = _.get(store.getState(), 'selectedCodeCards');
    codeCards = _.get(store.getState(), 'codeCards');
    expect(selectedCodeCards).toHaveLength(2);
    expect(codeCards).toHaveLength(8);
    expect(showCodeDrawer).toBe(false);
  });
});
