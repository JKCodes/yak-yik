import React, { Component } from 'react';
import { Sidebar, Footer } from './presentation';

class Main extends Component {

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default Main;