import constants from '../constants'

var initialState = {
  user: null
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)

  switch (action.type) {
    case constants.CURRENT_USER_RECEIVED:
      updated['user'] = action.user

      return updated

    default:
      return state
  }
}