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

  commentsReceived: (comments) => {
    return  {
      type: constants.COMMENTS_RECEIVED,
      comments: comments      
    }
  }
}