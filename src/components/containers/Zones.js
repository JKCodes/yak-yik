import React, { Component } from 'react';
import { Zone, CreateZone } from '../presentation';
import { APIManager } from '../../utils';
import actions from '../../actions';
import { connect } from 'react-redux';

class Zones extends Component {
  constructor() {
    super()
    this.state = {

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

      this.props.zoneCreated(response.result)
    })
  }

  selectZone(index) {
    this.props.selectZone(index)
  }

  render() {

    const listItems = this.props.list.map((zone, i) => {
      let selected = (i == this.props.selected)
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
    list: state.zone.list,
    selected: state.zone.selectedZone
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
    zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
    selectZone: (index) => dispatch(actions.selectZone(index))
  }
}

export default connect(stateToProps, dispatchToProps)(Zones);