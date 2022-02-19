import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux';
import reducers from "./redux/reducers/Reducers";

import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// storage.removeItem('persist:employees')
// To include the default styles
// export const store = createStore(reducers);
const persistConfig = {
  key: 'employees',
  storage: storage,
  whitelist: ['employees'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };
ReactDOM.render(
  <Provider store={store}>
      <App/>
   </Provider>,
  document.getElementById('root')
);
