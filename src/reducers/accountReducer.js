import constants from '../constants'

var initialState = {
  appStatus: 'ready',
  user: null
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch (action.type) {
    case constants.APPLICATION_STATE:
      if (action.reducer != 'account') {
        return updated
      }

      updated['appStatus'] = action.status
      return updated

    case constants.CURRENT_USER_RECEIVED:
      updated['user'] = action.user
      updated['appStatus'] = 'ready'

      return updated

    case constants.CURRENT_USER_UPDATED:
      if (action.profile._id != updated.user._id) {
        return updated
      }

      updated['user'] = action.profile
      return updated

    default:
      return state
  }
}