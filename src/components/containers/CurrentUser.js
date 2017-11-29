import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import Dropzone from 'react-dropzone'
import { APIManager } from '../../utils'
import sha1 from 'sha1'

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

  uploadImage(files) {
    const image = files[0]
    const cloudName = process.env.CLOUDINARY_CLOUDNAME
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    let timestamp = Date.now() / 1000
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    const signature = sha1(`timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`)

    const params = {
      'api_key': apiKey,
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    APIManager.upload(url, image, params, (err, response) => {
      if (err) {
        alert(err)
        return
      }

      let updatedProfile = Object.assign({}, this.state.updated)
      updatedProfile['image'] = response.body['secure_url']

      this.setState({
        updated: updatedProfile
      })

    })
  }

  render() {
    const currentUser = this.props.user
    const image = (!this.state.updated.image) ? '' : this.state.updated.image.replace('upload', 'upload/c_thumb,h_150,w_150,x_0,y_0') // thumbnail rendering instead of the whole image

    return (
      <div>
        <h2>Welcome { currentUser.username }</h2>
        <input type="text" id="username" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} placeholder="Username" /><br />
        <input type="text" id="gender" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} placeholder="Gender" /><br />
        <input type="text" id="city" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.city} placeholder="City" /><br />
        <img src={image} /><br />
        <Dropzone onDrop={this.uploadImage.bind(this)} />
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