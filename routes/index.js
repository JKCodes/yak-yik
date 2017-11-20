var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createtest', function(req, res, next) {
  res.render('createTest', null);
});

module.exports = router;
