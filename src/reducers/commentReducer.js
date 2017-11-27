import constants from '../constants'

var initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.COMMENTS_RECEIVED:
      let updated = Object.assign({}, state)
      updated['list'] = action.comments

      return updated

    default:
      return state
  }
}