import React, { Component } from 'react';
import styles from './styles';
import { Comment, CreateComment } from '../presentation';
import actions from '../../actions';
import { connect } from 'react-redux';

class Comments extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidUpdate() {
    let zone = this.props.zones[this.props.index]
    if (zone == null) {
      return
    }

    let commentsArray = this.props.commentsMap[zone._id]
    if (commentsArray) {
      return
    }

    this.props.fetchComments({zone: zone._id}, zone)
  }

  submitComment(comment) {
    if (!this.props.user) {
      alert('Please Sign Up or Log In to Comment!')
      return
    }

    let updatedComment = Object.assign({}, comment)

    let zone = this.props.zones[this.props.index]
    updatedComment['zone'] = zone._id
    updatedComment['username'] = this.props.user.username

    this.props.commentCreated(updatedComment)
  }

  render() {

    const style = styles.comments;
    const selectedZone = this.props.zones[this.props.index]
    let zoneName = null
    let commentList = null
    
    if (selectedZone) {
      zoneName = selectedZone.name

      let zoneComments = this.props.commentsMap[selectedZone._id]
      
      if (zoneComments) {
        commentList = zoneComments.map((comment, i) => <li key={i}><Comment currentComment={comment} /></li>)
      }
    }

    let content = null
    if (this.props.appStatus == 'loading') {
      content = "Loading Comments..."
    } else {
      content = (
        <div>
          <h2>{zoneName}</h2>
          <div style={style.commentsBox}>
            <ul style={style.commentList}>
              { commentList }
            </ul>

            <CreateComment onCreate={this.submitComment.bind(this)} />
          </div>
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
    commentsMap: state.comment.map,
    index: state.zone.selectedZone,
    zones: state.zone.list,
    commentsLoaded: state.comment.commentsLoaded,
    user: state.account.user,
    appStatus: state.comment.appStatus
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    fetchComments: (params, zone) => dispatch(actions.fetchComments(params, zone)),
    commentCreated: (params) => dispatch(actions.commentCreated(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);