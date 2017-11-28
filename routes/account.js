var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var bcrypt = require('bcrypt')

router.get('/:action', function(req, res, next) {

  var action = req.params.action
  if (action == 'login') {

    res.json({
      confirmation: 'success',
      action: action
    })
  }
})

router.post('/:action', function(req, res, next) {

  var action = req.params.action
  if (action == 'login') {
    var params = {username: req.body.username}

    ProfileController.find(params, function(err, results) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err.message
        })

        return
      }

      if (results.length == 0) {
        res.json({
          confirmation: 'fail',
          message: 'Username does not exist'
        })

        return
      }

      var profile = results[0]
      var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
      if (!isPasswordCorrect) {
        res.json({
          confirmation: 'fail',
          message: 'Password is not correct.'
        })

        return
      }


      res.json({
        confirmation: 'success',
        profile: profile
      })
    })

  }
})

module.exports = router