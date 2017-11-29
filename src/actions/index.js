import constants from '../constants'
import { APIManager } from '../utils'

export default {
  fetchProfile: (params) => {
    return (dispatch) => {
      APIManager.get('/api/profile', params, (err, response) => {
        if (err) {
          alert(err)
          return
        }

        if (response.results.length == 0){
          alert('Profile Not Found.')
          return
        }

        const profile = response.results[0]

        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile
        })
      })
    }
  },

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
  }
}