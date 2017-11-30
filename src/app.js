import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import { Home, ProfileInfo } from './components/layout';
import { CurrentUser } from './components/containers';
import { Provider } from 'react-redux';
import store from './stores';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const initialState = window.__PRELOADED_STATE__

const app = (
  <Provider store={store.configureStore(initialState) }>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path='/profile/:username' component={ProfileInfo}></Route>
        <Route path='/currentuser' component={CurrentUser}></Route>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));