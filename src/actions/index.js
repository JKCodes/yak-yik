import constants from '../constants'
import { APIManager } from '../utils'

export default {
  login: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'account'
      })

      APIManager.post('/account/login', params, (err, response) => {
        if (err) {
          alert(err.message)
          return
        }
        
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.user
        })
      })
    }
  },

  register: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'account'
      })

      APIManager.post('/account/register', params, (err, response) => {
        if (err) {
          alert(err.message)
          return
        }
        
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.user
        })
      })
    }
  },

  logout: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'account'
      })

      APIManager.get('/account/logout', null, (err, response) => {
        if (err) {
          alert(err.message)
          return
        }
        
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.user
        })
      })
    }
  },

  fetchCurrentUser: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'account'
      })

      APIManager.get('/account/currentuser', params, (err, response) => {
        if (err) {
          console.log(err.message)
          return
        }

        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.user
        })
      })
    }
  },

  fetchZones: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'zone'
      })

      APIManager.get('/api/zone', params, (err, response) => {
        if (err) {
          alert(err)
          return
        }

        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: response.results
        })
      })
    }
  },

  fetchProfile: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'profile'
      })

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

  zoneCreated: (zone) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'profile'
      })

      APIManager.post('/api/zone', zone, (err, response) => {
        if (err) {
          alert('ERROR: ' + err.message)
          return
        }

        dispatch({
          type: constants.ZONE_CREATED,
          zone: response.result
        })
      })
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
  }
}