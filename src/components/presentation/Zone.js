import React, { Component } from 'react';
import styles from './styles';

class Zone extends Component {
  onSelectZone(event) {
    event.preventDefault()
    this.props.select(this.props.index)  
  }

  render() {
    const style = styles.zone
    const zipCode = this.props.currentZone.zipCodes[0]
    const title = (this.props.isSelected) ? <a style={style.title} href="#">{this.props.currentZone.name}</a> : <a href="#">{this.props.currentZone.name}</a>

    return (
      <div onClick={this.onSelectZone.bind(this)} style={style.container}>
        <h2 style={style.header}>
          { title }
        </h2>
        <span className="detail">{zipCode}</span><br />
        <span className="detail">{this.props.currentZone.numComments} comments</span>
      </div>
    )
  }
}

export default Zone;