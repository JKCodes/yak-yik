import React, { Component } from 'react';
import styles from './styles';
import { APIManager } from '../../utils';
import { Comment, CreateComment } from '../presentation';

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    APIManager.get('/api/comment', null, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }

      this.setState({
        list: response.results
      })
    })
  }

  submitComment(comment) {
    APIManager.post('/api/comment', comment, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }
    
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result)
    
      this.setState({
        list: updatedList  
      })
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

          <CreateComment onCreate={this.submitComment.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Comments;