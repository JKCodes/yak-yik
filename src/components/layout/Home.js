import React, { Component } from 'react';
import { Zones, Comments, Account } from '../containers';
import { Footer } from '../presentation';


class Home extends Component {
  render() {
    return (
      <div id="wrapper" className="clearfix" style={{background: '#f9f9f9'}}>
        <header id="header" className="no-sticky">
          <div id="header-wrap">
            <div className="container clearfix">
              <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

              <Zones />
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Comments />
            </div>

            <div className="col-md-4">
              <Account />
            </div>                      
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home;