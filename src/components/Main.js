import React, { Component } from 'react';
import { Sidebar, Footer } from './presentation';

class Main extends Component {

  render() {
    return (
      <div id="wrapper" className="clearfix">
        <Sidebar />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}

export default Main;