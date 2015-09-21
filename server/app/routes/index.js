'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/authusers', require('./authUsers'));

router.use('/transactions', require('./transactions'));

router.use('/members', require('./members'));

router.use('/events', require('./events'));

router.use('/eventtypes', require('./eventtypes'));

router.use('/venues',require('./venues'));

router.use('/tickets',require('./tickets'));

router.use('/cart', require('./cart'));

router.use('/recommend',require('./recs'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
