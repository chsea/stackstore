var router = require('express').Router();
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Promise = require('bluebird');
var Ticket = mongoose.model('Ticket');
var AuthUser = mongoose.model('AuthUser');
var User = mongoose.model('User');

function getAll(cart){
	return Ticket.find({_id: { $in: cart}})
	.deepPopulate("eventProduct.Venue eventProduct.EventType")
	.populate("seller")
	.populate("buyer")
	.exec();
}

router.use(function(req, res, next){
	if(!req.session.cart) req.session.cart = [];
	next();
});

router.get('/', function(req, res, next){
	getAll(req.session.cart).then(function(cart){
		res.json(cart);
	}).then(null, next);
});

router.post('/checkout', function(req, res, next){
	//test if cart is empty
	if(!req.session.cart.length) next(new Error('Your cart is empty'));
	//validate zip code
	if(!/^\d{5}$/.test(req.body.address.zip)) next(new Error('Invalid zip code'));
	//check if logged in
	var userPromise = req.session.passport.user ? 
	//if logged in, update user
		AuthUser.findById(req.session.passport.user).then(function(user){
			user.address = req.body.address;
			return user.save();
		}).then(null, next) :
		//if not logged in, check to see if email is in database
		User.findOne({email: req.body.email}).then(function(user){
			//update anonymous user's information if found
			if(user){
				user.address = req.body.address;
				user.firstName = req.body.firstName;
				user.lastName = req.body.lastName;
				return user.save().then(null, next);
			}
			//if the email is not in the database, create an anonymous user
			else{
				return User.create({
					address: req.body.address,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email
				});
			}
		}).then(null, next);

	userPromise.then(function(user){
		Promise.map(req.session.cart, function(ticketId){
			return Ticket.findById(ticketId).then(function(ticket){

				//make sure ticket isn't sold
				if(!ticket.dateSold && !ticket.buyer){
					ticket.dateSold = new Date();
					ticket.buyer = user._id;
					return ticket.save();
				}
				next(Error('Sorry, one or more of the tickets in your cart is no longer available'));
			});
		}).then(function(){
			req.session.cart = [];
			res.send('checkout success');
		}).then(null, next);
	});
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

router.delete('/', function(req, res, next){
	req.session.cart = [];
	res.status(204).json(req.session.cart);
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