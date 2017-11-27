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
    APIManager.get('/api/comment', null, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }

      this.props.commentsReceived(response.results)
    })
  }

  submitComment(comment) {
    APIManager.post('/api/comment', comment, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }
    
      this.props.commentCreated(response.result)
    })
  }

  render() {
    const commentList = this.props.list.map((comment, i) => {
      return (
        <li key={i}><Comment currentComment={comment} /></li>
      )
    })

    const style = styles.comments;

    return (
      <div>
        <h2>Comments: Zone 1</h2>
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
    list: state.comment.list
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments) => dispatch(actions.commentsReceived(comments)),
    commentCreated: (comment) => dispatch(actions.commentCreated(comment))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);