var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ticket = mongoose.model('Ticket');

router.param('id',function(req,res,next,id){
	Ticket.findById(id).populate('EventProduct User').then(
		function(result){
			req.ticket = result;
			next();
		},
		function (err) {
			err.status = 404;
			console.error(err);
			next(err);
		}
	);
});

router.get('/',function(req,res){
  Ticket.find(req.query).populate('seller buyer').then(function(tickets){
		res.send(tickets);
	});
});

router.get('/:id',function(req,res){
	res.json(req.ticket);
});

router.post('/',function(req,res, next){
	if (!req.isSeller && !req.isAdmin) return next({status: 403});
	Ticket.create(req.body).then(function (ticket) {
		res.status(201).json(ticket);
	}, function (err) {
			err.status = 500;
			next(err);
	});
});

router.put('/:id',function(req,res,next){
	if (req.session.passport.user != req.params.id) return next({status: 403});
	Ticket.findAndUpdate(req.ticket,req.body).then(
		function (saved) {res.json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.delete('/:id',function(req,res,next){
	if (req.session.passport.user != req.params.id && !req.isAdmin) return next({status: 403});
	Ticket.remove(req.ticket).then(
		function(){res.status(204).send(); },
		function(err){
			err.status = 500;
			next(err);
		});
});

module.exports = router;
