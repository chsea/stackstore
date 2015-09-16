var router = require('express').Router();
var Ticket = require('mongoose').model('Ticket');

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
	if(!req.session.cart) req.session.cart = [];
	next();
});

router.get('/', function(req, res, next){
	Ticket.find({_id: { $in: req.session.cart}}).then(function(cart){
		res.send(cart);
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
				res.status(201).json(req.session.cart);
			}
		}).then(null, next);
	}else{
		res.status(409).send(req.session.cart);
	}
});

router.delete('/:id', function(req, res, next){
	if(req.session.cart.indexOf(req.params.id) !== -1){
		req.session.cart.splice(req.session.cart.indexOf(req.params.id), 1);
		res.status(200).json(req.session.cart);
	}
	else{
		var err = new Error('TicketID not in cart');
		err.status = 404;
		next(err);
	}
});

module.exports = router;