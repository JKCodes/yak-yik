var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var React = require('react');
var ReactRouter = require('react-router');
var ReactDOMServer = require('react-dom/server');

var serverapp = require('../public/dist/es5/serverapp');
var store = require('../public/dist/es5/stores')
var Home = require('../public/dist/es5/components/layout/Home')

var controllers = require('../controllers')

matchRoutes = function(req, routes) {
  return new Promise(function(resolve, reject) {
    ReactRouter.match({ routes: routes, location: req.url }, function(error, redirectLocation, renderProps) {
      if (error) {
        reject(error)
        return
      }

      resolve(renderProps)
    })
  })
}

router.get('/', function(req, res, next) {

  var initialStore = null
  var reducers = {}

  controllers.account.currentUser(req)
  .then(function(user) {
    // fetch currentUser
    reducers['account'] = {
      user: user
    }

    return controllers.zone.get(null)
  })
  .then(function(zones) {
    // fetch zones
    reducers['zone'] = {
      selectedZone: 0,
      appStatus: 'ready',
      list: zones
    }
  })
  .then(function() {
    initialStore = store.configureStore(reducers)

    var routes = {
      path: '/',
      component: serverapp,
      initial: initialStore,
      indexRoute: {
        component: Home
      }
    }

    matchRoutes(req, routes)
    .then(function(renderProps) {
      var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
      res.render('index', { react: html, preloadedState: JSON.stringify(initialStore.getState()) });
    })
    .catch(function(err) {
      console.log('test 2' + err)
    })
  })
  .catch(function(err) {
    console.log('Not logged in')
  })  
});

router.get('/:page/:slug', function(req, res, next) {
  var page = req.params.page
  var slug = req.params.slug


});

router.get('/createtest', function(req, res, next) {
  res.render('createTest', null);
});

module.exports = router;
