import React, { Component } from 'react';

class CreateZone extends Component {
  constructor() {
    super()
    this.state = {
      zone: {
        name: '',
        zipCode: ''
      }
    }
  }
  updateZone(event) {
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[event.target.id] = event.target.value
    
    this.setState({
      zone: updatedZone
    })
  }

  submitZone() {
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone['zipCodes'] = updatedZone.zipCode.split(',').map((zip) => zip.trim())

    this.props.onCreate(updatedZone)
  }
  render() {
    return (
      <div>
        <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name" /><br />
        <input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip Code" /><br />
        <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Add Zone</button> 
      </div>
    )
  }
}

export default CreateZone;