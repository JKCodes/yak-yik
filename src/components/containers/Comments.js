import React, { Component } from 'react';
import styles from './styles';
import { Comment, CreateComment } from '../presentation';
import actions from '../../actions';
import { connect } from 'react-redux';

class Comments extends Component {
  constructor() {
    super()
    this.checkForComments = this.checkForComments.bind(this)
    this.state = {

    }
  }

  checkForComments() {
    let zone = this.props.zones[this.props.index]
    if (!zone) {
      return
    }

    let commentsArray = this.props.commentsMap[zone._id]
    if (commentsArray) {
      return
    }

    // this prevents multiple consecutive API calls
    if (this.props.appStatus == 'loading') {
      return
    }

    this.props.fetchComments({zone: zone._id})
  }

  componentDidMount() {
    this.checkForComments()
  }

  componentDidUpdate() {
    this.checkForComments()
  }

  submitComment(comment) {
    if (!this.props.user) {
      alert('Please Sign Up or Log In to Comment!')
      return
    }

    let updatedComment = Object.assign({}, comment)

    let zone = this.props.zones[this.props.index]
    updatedComment['zone'] = zone._id
    updatedComment['author'] = {
      id: this.props.user._id,
      username: this.props.user.username,
      image: this.props.user.image
    }

    this.props.commentCreated(updatedComment)
  }

  updateComment(comment, updatedBody) {
    this.props.updateComment(comment, {body: updatedBody})
  }

  render() {
    const style = styles.comments;
    const currentUser = this.props.user // null if not logged in
    const selectedZone = this.props.zones[this.props.index]
    let zoneName = null
    let commentList = null
    
    if (selectedZone) {
      zoneName = selectedZone.name

      let zoneComments = this.props.commentsMap[selectedZone._id]
      
      if (zoneComments) {
        commentList = zoneComments.map((comment, i) => <li key={i}><Comment currentComment={comment} onUpdate={this.updateComment.bind(this)} isEditable={(currentUser && currentUser._id == comment.author.id)}/></li>)
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
    user: state.account.user,
    appStatus: state.comment.appStatus
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    updateComment: (comment, params) => dispatch(actions.updateComment(comment, params)),
    fetchComments: (params) => dispatch(actions.fetchComments(params)),
    commentCreated: (params) => dispatch(actions.commentCreated(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);