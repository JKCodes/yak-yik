import constants from '../constants'

var initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ZONES_RECEIVED:
      let updated = Object.assign({}, state)
      updated['list'] = action.zones

      return updated

    default:
      return state
  }
}