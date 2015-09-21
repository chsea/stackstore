var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

router.param('id',function(req,res,next,id){
	Event.findOne({"_id": id}).populate('Venue EventType').then(
		function(e){
			req.e = e;
			next();
		},
		function (err) {
			err.status = 404;
			next(err);
		}
	);
});

router.get('/',function(req,res){
	Event.find().populate('Venue EventType').then(function(e){
		res.json(e);
	});
});

router.get('/:id',function(req,res){
	res.json(req.e);
});

router.post('/',function(req,res,next){
	if (!req.isAdmin) return res.status(403).send(";)");
	Event.create(req.body).then(function (e) {
		res.status(201).json(e);
	}, function (err) {
			err.status = 500;
			next(err);
	});
});

router.put('/:id',function(req,res,next){
	if (!req.isAdmin) return res.status(403).send(";)");
	Event.findByIdAndUpdate(req.e._id,req.body).then(
		function (saved) {res.json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.delete('/:id',function(req,res,next){
	if (!req.isAdmin) return res.status(403).send(";)");
	Event.remove(req.e).then(
		function(){res.status(204).send(); },
		function(err){
			err.status = 500;
			next(err);
		});
});

module.exports = router;
