import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      profile: null
    }
  }

  componentDidMount(){
    APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
      if (err){
        alert(err)
        return
      }

      if (response.results.length == 0){
        alert('Profile Not Found.')
        return
      }

      const profile = response.results[0]

      this.props.profileReceived(profile)
    })
  }

  render(){
    const profile = this.state.profile
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
    profiles: state.profile.list
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    profileReceived: (profile) => dispatch(actions.profileReceived(profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)