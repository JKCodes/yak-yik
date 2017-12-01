import constants from '../constants'

var initialState = {
  commentsLoaded: false,
  map: {},
  profileMap: {},
  appStatus: 'ready'
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)
  let updatedMap = Object.assign({}, updated.map)
  let updatedProfileMap = Object.assign({}, updated.profileMap)

  switch (action.type) {

    case constants.APPLICATION_STATE:
      if (action.reducer != 'comment') {
        return updated
      }

      updated['appStatus'] = action.status
      return updated

    case constants.COMMENTS_RECEIVED:

      if (action.zone) {
        let zoneComments = (updatedMap[action.zone._id]) ? Object.assign([], updatedMap[action.zone._id]) : []

        action.comments.forEach((comment, i) => {
          zoneComments.push(comment)
        })

        updatedMap[action.zone._id] = zoneComments
        updated['map'] = updatedMap
      }
      

      action.comments.forEach((comment, i) => {      
        let profileComments = (updatedProfileMap[comment.author.id]) ? updatedProfileMap[comment.author.id] : []
        profileComments.push(comment)
        updatedProfileMap[comment.author.id] = profileComments
      })

      updated['profileMap'] = updatedProfileMap
      updated['commentsLoaded'] = true
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
      updated['commentsLoaded'] = false

      return updated

    default:
      return state
  }
}