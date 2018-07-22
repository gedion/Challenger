import React from 'react';
import renderer from 'react-test-renderer';
import App from './../../../client/src/components/App';
import store from './../../../client/src/reducers';
import fs from 'fs';
import path from 'path';
import { SHOW_APP_INIT } from './../../../client/src/actions';

let initAppState = fs.readFileSync(path.join(__dirname, '../../../fixtures/init-app-state.json'), 'utf8');
initAppState = JSON.parse(initAppState);

describe('Tests client components', () => {
  beforeEach(() => {
    store.dispatch({ data: initAppState, type: SHOW_APP_INIT });
  });

  it('renders app correctly', () => {
    const tree = renderer
      .create(<App store={store} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
