import React, { Component } from 'react';
import { Zone, CreateZone } from '../presentation';
import actions from '../../actions';
import { connect } from 'react-redux';

class Zones extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount() {
    this.props.fetchZones(null)
  }

  submitZone(zone) {
    this.props.zoneCreated(zone)
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

    let content = null
    if (this.props.appStatus == 'loading') {
      content = 'Loading Zones...'
    } else {
      content = (
        <div>
          <ol>
            {listItems}
          </ol>

          <CreateZone onCreate={this.submitZone.bind(this)}/>
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

const stateToProps = (state) => {
  return {
    list: state.zone.list,
    selected: state.zone.selectedZone,
    appStatus: state.zone.appStatus
  }
} 

const dispatchToProps = (dispatch) => {
  return {
    fetchZones: (params) => dispatch(actions.fetchZones(params)),
    zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
    selectZone: (index) => dispatch(actions.selectZone(index))
  }
}

export default connect(stateToProps, dispatchToProps)(Zones);