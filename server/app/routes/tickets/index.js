var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ticket = mongoose.model('Ticket');

router.param('id',function(req,res,next,id){
	Ticket.findById(id).then(
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
  Ticket.find(req.query).then(function(tickets){
		res.send(tickets);
	});
});

router.get('/:id',function(req,res){
	res.json(req.ticket);
});

router.post('/',function(req,res, next){
	// TODO: need to check admin status first, which on fail would give 403 (Forbidden)
	Ticket.create(req.body).then(function (ticket) {
		res.status(201).json(ticket);
	}, function (err) {
			err.status = 500;
			next(err);
	});
});

router.put('/:id',function(req,res,next){
	// TODO: only seller can edit, else 403 (Forbidden)
	Ticket.findAndUpdate(req.ticket,req.body).then(
		function (saved) {res.json(saved); },
		function (err) {
			err.status = 500;
			next(err);
		}
	);
});

router.delete('/:id',function(req,res,next){
	// TODO: only seller and admin can edit, else 403 (Forbidden)
	Ticket.remove(req.ticket).then(
		function(){res.status(204).send(); },
		function(err){
			err.status = 500;
			next(err);
		});
});

module.exports = router;
