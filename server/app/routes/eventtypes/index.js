var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var EventType = mongoose.model('EventType');
var Event = mongoose.model('Event');

router.param('id',function(req,res,next,id){
	EventType.findOne({"_id": id}).then(
		function(e){
			req.eventType = e;
			next();
		},
		function (err) {
			err.status = 404;
			next(err);
		}
	);
});

router.get('/',function(req,res){
	EventType.find().then(function(e){
		res.json(e);
	});
});

router.get('/:id',function(req,res){
	res.json(req.eventType);
});

router.post('/',function(req,res,next){
	// TODO: need to check admin status first, which on fail would give 403 (Forbidden)
	EventType.create(req.body).then(function (e) {
		res.status(201).json(e);
	}, function (err) {
			err.status = 500;
			next(err);
	});
});

router.put('/:id',function(req,res,next){
	// TODO: need to check admin status first, which on fail would give 403 (Forbidden)
	EventType.findByIdAndUpdate(req.eventType._id,req.body,{new:true}).then(
		function (saved) {res.json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.delete('/:id',function(req,res,next){
	req.eventType.remove().then(
		function(){res.status(204).send(); },
		function(err){
			err.status = 500;
			next(err);
		});
});

router.get('/:id/dates',function(req,res){
	Event.find({"EventType": req.eventType._id}).populate('EventType')
		.then(function(list){res.send(list); });
});

module.exports = router;
