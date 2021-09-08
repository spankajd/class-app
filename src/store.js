import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './service/reducers';



const initialState = {
};

// const middleware = [autoSave, thunk];

const composeEnhancers =
  typeof window === 'object' &&
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : compose;

const store = createStore(
  rootReducer,
  initialState,
//   composeEnhancers(applyMiddleware(...middleware))
  composeEnhancers(applyMiddleware())
);

export default store;
