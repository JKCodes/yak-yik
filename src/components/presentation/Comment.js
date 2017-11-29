import React, { Component } from 'react';
import styles from './styles';
import { Link } from 'react-router-dom'
import { ImageHelper } from '../../utils'

class Comment extends Component {
  render() {
    const style = styles.comment;
    const currentComment = this.props.currentComment;
    const author = currentComment.author

    return (
      <div>
        <p style={style.commentBody}>
          {currentComment.body}
        </p>
        <img style={style.icon} src={ImageHelper.thumbnail(author.image, 32)} />
        <span style={style.commentData}>
          <Link to={`/profile/${currentComment.username}`}>{author.username}</Link>
        </span>
        <span style={style.commentBar}>|</span>
        <span style={style.commentData}>{currentComment.timestamp}</span>
        <hr />
      </div>
    )
  }
}

export default Comment;