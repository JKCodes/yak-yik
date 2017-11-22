import React, { Component } from 'react';
import Comment from './Comment';
import styles from './styles';

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      list: [
        {body:'comment 1', username: 'user1', timestamp:'10:30'},
        {body:'comment 2', username: 'user2', timestamp:'10:45'},
        {body:'comment 3', username: 'user3', timestamp:'11:00'}
      ]
    }
  }

  render() {
    const commentList = this.state.list.map((comment, i) => {
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
        </div>
      </div>
    )
  }
}

export default Comments