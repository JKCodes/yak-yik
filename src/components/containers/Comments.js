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

  componentDidMount() {
    // let zone = this.props.zones[this.props.index]
    // if (zone == null) {
    //   return
    // }

    // APIManager.get('/api/comment', {zone: zone._id}, (err, response) => {
    //   if (err) {
    //     alert('ERROR: ' + err.message)
    //     return
    //   }

    //   this.props.commentsReceived(response.results)
    // })
  }

  componentDidUpdate() {
    let zone = this.props.zones[this.props.index]
    if (zone == null) {
      return
    }

    if (this.props.commentsLoaded) {
      return
    }

    APIManager.get('/api/comment', {zone: zone._id}, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }

      this.props.commentsReceived(response.results)
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
    
      this.props.commentCreated(response.result)
    })
  }

  render() {
    const commentList = this.props.comments.map((comment, i) => {
      return (
        <li key={i}><Comment currentComment={comment} /></li>
      )
    })

    const style = styles.comments;
    const selectedZone = this.props.zones[this.props.index]
    const zoneName = (selectedZone == null) ? '' : selectedZone.name
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
    comments: state.comment.list,
    index: state.zone.selectedZone,
    zones: state.zone.list,
    commentsLoaded: state.comment.commentsLoaded
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments) => dispatch(actions.commentsReceived(comments)),
    commentCreated: (comment) => dispatch(actions.commentCreated(comment))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);