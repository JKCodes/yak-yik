import React, { Component } from 'react';
import styles from './styles';
import { Link } from 'react-router-dom'

class Comment extends Component {
  render() {
    const style = styles.comment;
    const currentComment = this.props.currentComment;

    return (
      <div>
        <p style={style.commentBody}>{this.props.currentComment.body}</p>
        <span style={style.commentData}>
          <Link to={{pathname: `/profile/${currentComment.username}`, state: {username: this.props.currentComment.username}}}>{this.props.currentComment.username}</Link>
        </span>
        <span style={style.commentBar}>|</span>
        <span style={style.commentData}>{currentComment.timestamp}</span>
        <hr />
      </div>
    )
  }
}

export default Comment;