import React, { Component } from 'react';
import styles from './styles';
import { Link } from 'react-router'
import { ImageHelper } from '../../utils'

class Comment extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      updated: null
    }
  }


  toggleEdit(event) {
    event.preventDefault()
    if (this.state.isEditing && this.state.updated) {
      this.props.onUpdate(this.props.currentComment, this.state.updated)
    }

    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  updateBody(event) {
    this.setState({
      updated: event.target.value
    })
  }

  render() {
    const style = styles.comment;
    const currentComment = this.props.currentComment;
    const author = currentComment.author
    const editable = (this.props.isEditable) ? this.props.isEditable : false

    let content = null
    if (this.state.isEditing) {
      content = (
        <div>
          <textarea onChange={this.updateBody.bind(this)} style={style.textarea} defaultValue={currentComment.body} />
          <br />
          <img style={style.icon} src={ImageHelper.thumbnail(author.image, 32)} />
          <span style={style.commentData}>
            <Link to={`/profile/${currentComment.username}`}>{author.username}</Link>
          </span>
          <span style={style.commentBar}>|</span>
          <span style={style.commentData}>{currentComment.timestamp}</span>
          { (editable) ? <button style={style.editButton} onClick={this.toggleEdit.bind(this)}>Done</button> : null
          }
          
          <hr />
        </div>
      )
    } else {
      content = (
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
          { (editable) ? <button style={style.editButton} onClick={this.toggleEdit.bind(this)}>Edit</button> : null
          }
          <hr />
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

export default Comment;