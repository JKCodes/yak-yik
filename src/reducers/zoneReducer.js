import constants from '../constants'

var initialState = {
  appStatus: 'ready',
  selectedZone: 0,
  list: []
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch (action.type) {
    case constants.APPLICATION_STATE:
      if (action.reducer != 'zone') {
        return updated
      }

      updated['appStatus'] = action.status
      return updated

    case constants.ZONES_RECEIVED:
      updated['list'] = action.zones
      updated['appStatus'] = 'ready'

      return updated

    case constants.ZONE_CREATED:
      let updatedList = Object.assign([], updated.list)
      updatedList.push(action.zone)
      updated['list'] = updatedList

      return updated

    case constants.SELECT_ZONE:
      updated['selectedZone'] = action.selectedZone

      return updated
    default:
      return state
  }
}