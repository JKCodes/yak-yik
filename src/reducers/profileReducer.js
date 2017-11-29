import constants from '../constants'

var initialState = {
  appStatus: 'ready',
  map: {}
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch (action.type) {

    case constants.APPLICATION_STATE:
      if (action.reducer != 'profile') {
        return updated
      }

      updated['appStatus'] = action.status
      return updated
    
    case constants.PROFILE_RECEIVED:
      let updatedMap = Object.assign({}, updated.map)
      updatedMap[action.profile.username] = action.profile
      updated['map'] = updatedMap
      updated['appStatus'] = 'ready'

      return updated
    
    default:
      return state
  }
}