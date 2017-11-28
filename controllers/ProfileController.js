var Profile = require('../models/Profile')

module.exports = {
  find: function(params, callback) {
    Profile.find(params, null, {sort: {timestamp: -1}}, function(err, profiles) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, profiles)
    })
  },

  findById: function(id, callback) {
    Profile.findById(id, function(err, profile) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, profile)
    })
  },

  create: function(params, callback) {
    Profile.create(params, function(err, profile) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, profile)
    })
  },

  update: function(id, params, callback) {
    Profile.findByIdAndUpdate(id, params, {new:true},function(err, profile) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, profile)
    })
  },

  delete: function(id, callback) {
    Profile.findByIdAndRemove(id, function(err) {
      if (err) {
        callback(err)
        return
      }

      callback(null)
    })
  }
}