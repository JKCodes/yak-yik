import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profile extends Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    const profile = this.props.profiles[this.props.username]
    if (profile) 
      return

    this.props.fetchProfile({username: this.props.username})
  }

  render(){
    let profile = this.props.profiles[this.props.username]

    let header = null
    if (profile) {
      header = (
        <div>
          <h3>{profile.username}</h3>
          <p>
            gender: {profile.gender}<br />
            city: {profile.city}
          </p>
        </div>
      )
    }

    return (
      <div>
        {header}
        
      </div>
    )
  }


}

const stateToProps = (state) => {
  return {
    profiles: state.profile.map
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    fetchProfile: (params) => dispatch(actions.fetchProfile(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)