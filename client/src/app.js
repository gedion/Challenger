// See https://medium.freecodecamp.com/you-might-not-need-react-router-38673620f3d
// for how history and routing work.

// Import css as global by bypassing CSS Modules (as discussed in
// https://github.com/css-modules/css-modules/pull/65)

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import history from './history';
import router from './router';
import routes from './routes';
import store from './reducers';  // TODO: Reorganize store and reducers.
const container = document.getElementById('react-root');

// For example of wiring up redux, see
// https://github.com/reactjs/redux/blob/master/docs/basics/ExampleTodoList.md

function renderComponent (component) {
  const providerForReduxStore = <Provider store={store}>{component}</Provider>;
  ReactDOM.render(providerForReduxStore, container);
}

function render (location) {
  router.resolve(routes, location)
    .then(renderComponent)
    // This catch adds an error property to the location object.
    .catch(error => {
      console.error(error);
      router.resolve(routes, { ...location, error })
      .then(renderComponent);
    });
}

render(history.location);
history.listen(render);

// See longer version of this in
// https://github.com/kriasoft/react-starter-kit/blob/master/src/client.js.
if (module.hot) {
  module.hot.accept();
}
