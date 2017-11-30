import React, { Component } from 'react';
import { Profile } from '../containers'

class ProfileInfo extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Profile username={this.props.params.username} />
      </div>
    )
  }
}

export default ProfileInfo;