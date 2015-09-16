var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var EventProduct = mongoose.model('EventProduct');

router.param('id',function(req,res,next,id){
	EventProduct.findById(id).then(
		function(e){
			req.e = e;
			next();
		},
		function (err) {
			err.status = 404;
			console.error(err);
			next(err);
		}
	);
});

router.get('/',function(req,res,next){
	EventProduct.find().then(function(e){
		console.log('here are your events');
		res.json(e);
	});
});

router.get('/:id',function(req,res,next){
	res.json(req.e);
});

router.post('/',function(req,res,next){
	// TODO: need to check admin status first, which on fail would give 403 (Forbidden)
	EventProduct.create(req.body).then(function (e) {
		res.status(201).json(e);
	}, function (err) {
			err.status = 500;
			next(err);
	});
});

router.put('/:id',function(req,res,next){
	// TODO: need to check admin status first, which on fail would give 403 (Forbidden)
	EventProduct.findAndUpdate(req.e,req.body).then(
		function (saved) {res.json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.delete('/:id',function(req,res,next){
	EventProduct.remove(req.e).then(
		function(){res.status(204).send(); },
		function(err){
			err.status = 500;
			next(err);
		});
});

router.use('/:id/tickets', require('./tickets.router.js'));

module.exports = router;
