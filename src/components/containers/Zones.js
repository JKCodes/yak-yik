import React, { Component } from 'react';
import { Zone, CreateZone } from '../presentation';
import { APIManager } from '../../utils';
import actions from '../../actions';
import { connect } from 'react-redux';

class Zones extends Component {
  constructor() {
    super()
    this.state = {
      selected: 0,
      list: []
    }
  }

  componentDidMount() {
    APIManager.get('/api/zone', null, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message)
        return
      }

      this.props.zonesReceived(response.results)
    })
  }

  submitZone(zone) {
    APIManager.post('/api/zone', zone, (err, response) => {
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

  selectZone(index) {
    this.setState({
      selected: index
    })
  }

  render() {

    const listItems = this.props.list.map((zone, i) => {
      let selected = (i == this.state.selected)
      return (
        <li key={i}>
          <Zone 
            index={i}
            isSelected={selected} 
            currentZone={zone} 
            select={this.selectZone.bind(this)}
          />
        </li>
      )
    })

    return (
      <div>
        <ol>
          {listItems}
        </ol>

        <CreateZone onCreate={this.submitZone.bind(this)}/>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    list: state.zone.list
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)) 
  }
}

export default connect(stateToProps, dispatchToProps)(Zones);