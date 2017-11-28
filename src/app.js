import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layout/Home';
import { Provider } from 'react-redux';
import store from './stores';
import { BrowserRouter as Router, Route, IndexRoute, Switch } from 'react-router-dom';

const app = (
  <Provider store={store.configureStore() }>
    <Router>
      <Route path='/' component={Home}></Route>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));