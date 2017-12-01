import constants from '../constants'

var initialState = {
  map: {},
  appStatus: 'ready'
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)
  let updatedMap = Object.assign({}, updated.map)

  switch (action.type) {

    case constants.APPLICATION_STATE:
      if (action.reducer != 'comment') {
        return updated
      }

      updated['appStatus'] = action.status
      return updated

    case constants.COMMENTS_RECEIVED:

      let keys = Object.keys(action.params)
      let key = keys[0]  // zone, profile, etc.
      let value = action.params[key] // id for zone, profile, etc.
      let array = (updatedMap[value]) ? updatedMap[value] : []

      action.comments.forEach((comment, i) => {
        array.push(comment)
      })

      updatedMap[value] = array
      updated['map'] = updatedMap
      updated['appStatus'] = 'ready'

      return updated

    case constants.COMMENT_CREATED:
      let commentList = (updatedMap[action.comment.zone]) ? Object.assign([], updatedMap[action.comment.zone]) : []
      
      commentList.push(action.comment)

      updatedMap[action.comment.zone] = commentList
      updated['map'] = updatedMap
      updated['appStatus'] = 'ready'

      return updated

    case constants.COMMENT_UPDATED:
      let list = updatedMap[action.comment.zone]
      let newList = []

      list.forEach((comment, i) => {
        if (comment._id == action.comment._id) {
          newList.push(action.comment)
        } else {
          newList.push(comment)
        }
      })

      updatedMap[action.comment.zone] = newList
      updated['map'] = updatedMap
      updated['appStatus'] = 'ready'

      return updated

    case constants.SELECT_ZONE:
      return updated

    default:
      return state
  }
}