import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import mainReducer from './reducers/mainReducer';
import rootSaga from './sagas/sagas';
import './index.css';

/*
    STORE STRUCTURE:
    { hasSubmitted: Boolean,
      submitText: String,
      submitURL: String,
      allShortURLs: Array,
    }
*/

// Init Redux-Saga and Redux

const sagaMiddleware = createSagaMiddleware();
const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// Render

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
