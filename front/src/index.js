/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';
import { Provider } from 'react-redux';
import history from './js/history'

import { Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux';
import Logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import reducers from './js/Reducers/';
import sagas from './js/Sagas/';

import Main from './js/components/Main';


const container = css({
  minHeight: '100vh',
  width: '100%',
  display: 'block',
  backgroundColor: '#FFFFFF'
})


const sagaMiddleware = createSagaMiddleware()

let store = createStore(reducers, applyMiddleware(Logger), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <div>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <Router history={history}>
        <div {...container}>
          <Route path='/' component={Main} />
        </div>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)