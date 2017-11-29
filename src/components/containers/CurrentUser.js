import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class CurrentUser extends Component {
  constructor() {
    super()
    this.state = {
      updated: {
       
      }
    }
  }

  updateCurrentUser(event) {
    event.preventDefault()
    
    let updatedProfile = Object.assign({}, this.state.updated)
    updatedProfile[event.target.id] = event.target.value
    this.setState({
      updated: updatedProfile
    })
  }

  updateProfile(event) {
    event.preventDefault()

    if (Object.keys(this.state.updated).length == 0) {
      alert('No Changes Detected')
      return
    }

    this.props.updateProfile(this.props.user, this.state.updated)
  }

  render() {
    const currentUser = this.props.user

    return (
      <div>
        <h2>Welcome { currentUser.username }</h2>
        <input type="text" id="username" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} placeholder="Username" /><br />
        <input type="text" id="gender" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} placeholder="Gender" /><br />
        <input type="text" id="city" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.city} placeholder="City" /><br />
        <button onClick={this.updateProfile.bind(this)}>Update Profile</button>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile, updated) => dispatch(actions.updateProfile(profile, updated))
  }
}

export default connect(stateToProps, dispatchToProps)(CurrentUser)