import React, { Component } from 'react';
import styles from './styles';
import { APIManager } from '../../utils';
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

    APIManager.get('/api/comment', {zone: zone._id}, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }

      let comments = response.results
      this.props.commentsReceived(comments, zone)
    })
  }

  submitComment(comment) {
    let updatedComment = Object.assign({}, comment)

    let zone = this.props.zones[this.props.index]
    updatedComment['zone'] = zone._id

    APIManager.post('/api/comment', updatedComment, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }
    
      const comment = response.result

      this.props.commentCreated(comment)
    })
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

    return (
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
}

const stateToProps = (state) => {
  return {
    commentsMap: state.comment.map,
    index: state.zone.selectedZone,
    zones: state.zone.list,
    commentsLoaded: state.comment.commentsLoaded
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
    commentCreated: (comment) => dispatch(actions.commentCreated(comment))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);