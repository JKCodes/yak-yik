import React, { Component } from 'react'
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
    if (profile) {

      if (this.props.commentStatus == 'loading') {
        return
      }

      this.props.fetchComments({'author.id': profile._id}, null)
      return
    }

    this.props.fetchProfile({username: this.props.username})
  }

  render(){
    let profile = this.props.profiles[this.props.username]

    let header = null
    if (profile) {

      const comments = (this.props.comments[profile._id]) ? this.props.comments[profile._id] : []
      const list = comments.map((comment, i) => {
        return (<li key={i}>{comment.body}</li>)
      })
      console.log(this.props.comments)
      console.log(profile._id)

      header = (
        <div>
          <h3>{profile.username}</h3>
          <p>
            gender: {profile.gender}<br />
            city: {profile.city}
          </p>

          <h2>Comments</h2>
          <ol>
            {list}
          </ol>
        </div>
      )
    }

    const content = (this.props.appStatus == 'loading') ? 'Loading...' : header

    return (
      <div>
        {content}
      </div>
    )
  }


}

const stateToProps = (state) => {
  return {
    profiles: state.profile.map,
    comments: state.comment.profileMap,
    appStatus: state.profile.appStatus,
    commentStatus: state.comment.appStatus
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
    fetchComments: (params, zone) => dispatch(actions.fetchComments(params, zone))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)