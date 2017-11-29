import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home, ProfileInfo } from './components/layout';
import { CurrentUser } from './components/containers';
import { Provider } from 'react-redux';
import store from './stores';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const app = (
  <Provider store={store.configureStore() }>
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/profile/:username' component={ProfileInfo}></Route>
        <Route exact path='/currentuser' component={CurrentUser}></Route>
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));