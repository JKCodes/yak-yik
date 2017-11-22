import React, { Component } from 'react';
import Comment from '../presentation/Comment';
import styles from './styles';

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list: []
    }
  }

  submitComment() {
    console.log(this.state.comment)
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.comment)

    this.setState({
      list: updatedList  
    })
  }

  updateComment(param, event) {
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment[param] = event.target.value
    
    this.setState({
      comment: updatedComment
    })
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

          <input onChange={this.updateComment.bind(this, 'username')} className="form-control" type="text" placeholder="Username" /><br />
          <input onChange={this.updateComment.bind(this, 'body')}className="form-control" type="text" placeholder="Comment" /><br />
          <input onChange={this.updateComment.bind(this, 'timestamp')}className="form-control" type="text" placeholder="Timestamp" /><br />
          <button onClick={this.submitComment.bind(this)} className="btn btn-info" >Submit Comment</button>
        </div>
      </div>
    )
  }
}

export default Comments