import constants from '../constants'

var initialState = {
  selectedZone: 0,
  list: []
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch (action.type) {
    case constants.ZONES_RECEIVED:
      updated['list'] = action.zones

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