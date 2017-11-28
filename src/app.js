import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home, ProfileInfo } from './components/layout';
import { Provider } from 'react-redux';
import store from './stores';
import { BrowserRouter as Router, Route, IndexRoute, Switch } from 'react-router-dom';

const app = (
  <Provider store={store.configureStore() }>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/profile/:username' component={ProfileInfo} />
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));