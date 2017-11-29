import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Account extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      profile: {
        username: '',
        password: '',
        city: '',
        gender: ''
      }
    }
  }

  componentDidMount() {
    this.props.fetchCurrentUser(null)
  }

  updateProfile(event) {
    event.preventDefault()
    let updateProfile = Object.assign({}, this.state.profile)
    updateProfile[event.target.id] = event.target.value
    this.setState({
      profile: updateProfile
    })
  }

  login(event) {
    event.preventDefault()

    if (this.state.profile.username.length == 0) {
      alert('Please enter your username')
      return
    }

    if (this.state.profile.password.length == 0) {
      alert('Please enter a password')
      return
    }

    this.props.login(this.state.profile)
  }

  signup(event) {
    event.preventDefault()

    if (this.state.profile.username.length == 0) {
      alert('Please enter your username')
      return
    }

    if (this.state.profile.password.length == 0) {
      alert('Please enter a password')
      return
    }

    this.props.register(this.state.profile)
  }

  logout(event) {
    event.preventDefault()

    this.props.logout(null)
  }

  render() {
    let content = null

    if (this.props.appStatus == 'loading') {
      content = 'Fetching Current User Info...'
    } else if (!this.props.user) {
      content = (
        <div>
          <h2>Log In</h2>
          <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username" /><br />
          <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password" /><br />
          <button onClick={this.login.bind(this)}>Log In</button>
          <h2>Sign Up</h2>
          <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username" /><br />
          <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password" /><br />
          <input id="city" onChange={this.updateProfile.bind(this)} type="text" placeholder="City" /><br />
          <input id="gender" onChange={this.updateProfile.bind(this)} type="text" placeholder="Gender" /><br />
          <button onClick={this.signup.bind(this)}>Sign Up</button>
        </div>
      )
    } else {
      content = (
        <div> 
          <h2>Welcome {this.props.user.username} </h2>
          <button onClick={this.logout.bind(this)}>Log Out</button> 
          <Link to="/currentuser"><button>Account</button></Link>
        </div>
      )
    }

    return (
      <div>
        { content }
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user,
    appStatus: state.account.appStatus
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(actions.login(params)),
    register: (params) => dispatch(actions.register(params)),
    logout: (params) => dispatch(actions.logout(params)),
    fetchCurrentUser: (params) => dispatch(actions.fetchCurrentUser(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Account)