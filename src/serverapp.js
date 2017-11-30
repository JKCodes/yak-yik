import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home, ProfileInfo } from './components/layout';
import { CurrentUser } from './components/containers';
import { Provider } from 'react-redux';
import store from './stores';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore() }>
        <Router>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/profile/:username' component={ProfileInfo}></Route>
            <Route exact path='/currentuser' component={CurrentUser}></Route>
        </Router>
      </Provider>
    )
  }
}

export default App