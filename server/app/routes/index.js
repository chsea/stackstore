'use strict';
var router = require('express').Router();
var User = require('mongoose').model('User');

module.exports = router;

router.use(function(req, res, next) {
  if (req.session.passport.user) {
    User.findById(req.session.passport.user).then((user) => {
      if (user.roles.indexOf('admin') > -1) req.isAdmin = true;
      if (user.roles.indexOf('seller') > -1) req.isSeller = true;
      return next();
    });
  } else next();
});
router.use('/users', require('./users'));
router.use('/authusers', require('./authUsers'));
router.use('/members', require('./members'));
router.use('/events', require('./events'));
router.use('/eventtypes', require('./eventtypes'));
router.use('/venues', require('./venues'));
router.use('/tickets', require('./tickets'));
router.use('/reviews', require('./reviews'));
router.use('/cart', require('./cart'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
