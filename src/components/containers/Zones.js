import React, { Component } from 'react';
import Zone from '../presentation/Zone'

class Zones extends Component {
  constructor() {
    super()
    this.state = {
      zone: {
        name: '',
        zipCode: ''
      },
      list: []
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
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.zone)
    
    this.setState({
      list: updatedList  
    })
  }

  render() {

    const listItems = this.state.list.map((zone, i) => {
      return (
        <li key={i}><Zone currentZone={zone} /></li>
      )
    })

    return (
      <div>
        <ol>
          {listItems}
        </ol>

        <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name" /><br />
        <input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip Code" /><br />
        <input id="numComments" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Comments" /><br />
        <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Add Zone</button> 
      </div>
    )
  }
}

export default Zones;