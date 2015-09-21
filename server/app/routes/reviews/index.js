var router = require('express').Router();
var Review = require('mongoose').model('Review');

router.param('id', function(req, res, next, id){
	Review.findById(id).then(function(review){
		req.review = review;
		next();
	}).then(null, next);
});

router.get('/', function(req, res, next){
	Review.find(req.query).populate('reviewer').then(function(reviews){
		res.json(reviews);
	}).then(next);
});

router.get('/:id', function(req, res){
	res.json(req.review);
});

router.post('/', function(req, res, next){
	if (!req.isAuthenticated()) return next({status: 403});
	Review.create(req.body).then(function(review){
		res.status(201).json(review);
	}).then(null, next);
});

router.put('/:id', function(req, res, next){
	if (!req.isAdmin()) return next({status: 403});
	req.review.save().then(function(review){
		res.send(review);
	}).then(null, next);
});

router.delete('/:id', function(req, res, next){
	if (!req.isAdmin()) return next({status: 403});
	req.review.remove().then(function(review){
		res.send(review);
	}).then(null, next);
});

module.exports = router;
