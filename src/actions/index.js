import constants from '../constants'

export default {

  zonesReceived: (zones) => {
    return  {
      type: constants.ZONES_RECEIVED,
      zones: zones      
    }
  },

  zoneCreated: (zone) => {
    return  {
      type: constants.ZONE_CREATED,
      zone: zone      
    }
  },  

  selectZone: (index) => {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: index
    }
  },

  commentsReceived: (comments, zone) => {
    return  {
      type: constants.COMMENTS_RECEIVED,
      comments: comments,
      zone: zone
    }
  },

  commentCreated: (comment) => {
    return  {
      type: constants.COMMENT_CREATED,
      comment: comment      
    }
  },

  currentUserReceived: (user) => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    }
  },

  profileReceived: (profile) => {
    return {
      type: constants.PROFILE_RECEIVED,
      profile: profile
    }
  }
}