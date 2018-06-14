import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as chuck, initialState } from './modules/chuck';

export default () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    const { logger } = require('redux-logger');

    middlewares.push(logger);
  }

  const rootReducer = combineReducers({ chuck });

  const store = createStore(
    rootReducer,
    { chuck: initialState },
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};
