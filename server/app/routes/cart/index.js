var router = require('express').Router();
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Ticket = mongoose.model('Ticket');

function getAll(cart){
	return Ticket.find({_id: { $in: cart}}).deepPopulate("eventProduct.venue")
	.populate("seller").populate("buyer").exec();
}

router.param('id', function(req, res, next, id){
	Ticket.findById(id).then(function(ticket){
		if(!ticket) {
			var err = new Error('TicketID not in database');
			err.status = 404;
			next(err);
		}
		next();
	}).then(null, next);
});

router.use(function(req, res, next){
	if(!req.session.cart) req.session.cart = ['55f9a2d0087ebaf72fbdf907',
		'55f9a2d0087ebaf72fbdf908'];
	next();
});

router.get('/', function(req, res, next){
	getAll(req.session.cart).then(function(cart){
		res.json(cart);
	}).then(null, next);
});

router.post('/:id', function(req, res, next){
	if(req.session.cart.indexOf(req.params.id) === -1) {
		Ticket.findById(req.params.id).then(function(ticket){
			if(!ticket) {
				var err = new Error('TicketID not in database');
				err.status = 404;
				next(err);
			}else{
				req.session.cart.push(req.params.id);
				res.status(201);
				getAll(req.session.cart).then(function(cart){
					res.json(cart);
				});
			}
		}).then(null, next);
	}else{
		res.status(409).send(req.session.cart);
	}
});

router.delete('/:id', function(req, res, next){
	if(req.session.cart.indexOf(req.params.id) !== -1){
		req.session.cart.splice(req.session.cart.indexOf(req.params.id), 1);
		res.status(200);
	}
	else{
		res.status(404);
	}
	getAll(req.session.cart).then(function(cart){
		res.json(cart);
	}).then(null, next);
});

module.exports = router;