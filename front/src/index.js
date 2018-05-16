/** @format */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'glamor';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { syncHistoryWithStore, ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './js/Reducers/';
import sagas from './js/Sagas/';

import MenuApp from "./js/components/Menu/MenuApp";
import Main from './js/components/Main';

const history = createHistory();

const container = css({
  minHeight: '100vh',
  width: '100%',
  display: 'block',
  backgroundColor: '#FFFFFF'
})

const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)

let store = createStore(reducers, applyMiddleware(Logger), applyMiddleware(sagaMiddleware), applyMiddleware(routeMiddleware))

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <Router history={syncHistoryWithStore(history, store)}>
      <div {...container}>
        <MenuApp />
        <Route path='/' component={Main} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)