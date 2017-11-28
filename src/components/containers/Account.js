import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Account extends Component {
  constructor() {
    super()
    this.state = {
      profile: {
        username: '',
        password: ''
      }
    }
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

    APIManager.post('/account/login', this.state.profile, function(err, response) {
      if (err) {
        alert(err.message)
        return
      }

      console.log(response.results)

    })
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

    APIManager.post('/api/profile', this.state.profile, function(err, response) {
      if (err) {
        alert(err.message)
        return
      }

    })
  }

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username" /><br />
        <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password" /><br />
        <button onClick={this.login.bind(this)}>Log In</button>
        <h2>Sign Up</h2>
        <input id="username" onChange={this.updateProfile.bind(this)} type="text" placeholder="username" /><br />
        <input id="password" onChange={this.updateProfile.bind(this)} type="password" placeholder="password" /><br />
        <button onClick={this.signup.bind(this)}>Sign Up</button>
      </div>
    )
  }
}

export default Account