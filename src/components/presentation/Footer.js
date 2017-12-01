import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer id="footer" className="dark">
        <div id="copyrights">
          <div className="container clearfix">
            <div className="col_half">
              Copyrights &copy; 2014 All Rights Reserved by Canvas Inc.<br />
              <div className="copyright-links"><a href="#">Terms of Use</a> / <a href="#">Privacy Policy</a></div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer