var express = require('express')
var router = express.Router()

router.post('/:action', function(req, res, next) {

  var action = req.params.action
  if (action == 'login') {

    res.json({
      confirmation: 'success',
      action: action
    })
  }
})

module.exports = router