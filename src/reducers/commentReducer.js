import constants from '../constants'

var initialState = {
  list: []
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch (action.type) {
    case constants.COMMENTS_RECEIVED:
      updated['list'] = action.comments

      return updated

    case constants.COMMENT_CREATED:
      let updatedList = Object.assign([], updated.list)
      updatedList.push(action.comment)
      updated['list'] = updatedList

      return updated
    default:
      return state
  }
}