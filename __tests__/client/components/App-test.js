import React from 'react';
import renderer from 'react-test-renderer';
import App from './../../../client/src/components/App';
import store from './../../../client/src/reducers';

it('renders app correctly', () => {
  const tree = renderer
    .create(<App store={store} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
