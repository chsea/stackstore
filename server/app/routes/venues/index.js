var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Venue = mongoose.model('Venue');
var Event = mongoose.model('Event');

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
	Event.find({"Venue": req.venue._id}).populate('EventType').exec()
	.then(function (events) {
		res.send(events);
	});
});

router.post('/',function(req,res,next){
	if (!req.isAdmin) return res.status(403).send(";)");
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
	if (!req.isAdmin) return res.status(403).send(";)");
	Venue.findByIdAndUpdate(req.venue._id,req.body, {new: true}).then(
		function (saved) {res.json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.delete('/:id',function(req,res,next){
	if (!req.isAdmin) return res.status(403).send(";)");
	req.venue.remove().then(
		function(){res.status(204).send(); },
		function(err){
			err.status = 500;
			next(err);
		});
});

module.exports = router;
