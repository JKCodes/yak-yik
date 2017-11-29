import constants from '../constants'

var initialState = {
  list: []
}

export default (state = initialState, action) => {

  var updated = Object.assign({}, state)
  var updatedList = Object.assign([], updated.list)

  switch (action.type) {
    
    case constants.PROFILE_RECEIVED:
      updatedList.push(action.profile)
      updated['list'] = updatedList
      
      return updated
    
    default:
      return state
  }
}