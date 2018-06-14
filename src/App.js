import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import createStore from './store/createStore';

import Header from './Header';
import Jokes from './Jokes/';

const store = createStore();

const App = () => (
  <Fragment>
    <Header />
    <Provider store={store}>
      <Jokes />
    </Provider>
  </Fragment>
);

export default App;
