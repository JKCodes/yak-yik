import constants from '../constants'

var initialState = {
  map: {}
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch (action.type) {
    
    case constants.PROFILE_RECEIVED:
      let updatedMap = Object.assign({}, updated.map)
      updatedMap[action.profile.username] = action.profile
      updated['map'] = updatedMap

      return updated
    
    default:
      return state
  }
}