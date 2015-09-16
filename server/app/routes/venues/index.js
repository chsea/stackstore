var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Venue = mongoose.model('Venue');
var EventProduct = mongoose.model('EventProduct');

router.param('id',function(req,res,next,id){
	Venue.findById(id).then(
		function(result){
			req.venue = result;
			next();
		},
		function (err) {
			err.status = 404;
			next(err);
		}
	);
});

router.get('/',function(req,res){
	Venue.find().then(function(e){
		res.send(e);
	});
});

router.get('/:id',function(req,res){
	res.json(req.venue);
});

router.get('/:id/events',function(req,res){
	EventProduct.find({"venue": req.venue._id}).then(function(events){res.send(events); });
});

router.post('/',function(req,res,next){
	// TODO: need to check admin status first, which on fail would give 403 (Forbidden)
	var newVenue = new Venue(req.body);
	newVenue.save().then(
		function (saved) {res.status(201).json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.put('/:id',function(req,res,next){
	// TODO: need to check admin status first, which on fail would give 403 (Forbidden)
	Venue.findAndUpdate(req.venue,req.body).then(
		function (saved) {res.json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.delete('/:id',function(req,res,next){
	Venue.remove(req.venue).then(
		function(){res.status(204).send(); },
		function(err){
			err.status = 500;
			next(err);
		});
});

module.exports = router;