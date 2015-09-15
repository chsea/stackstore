var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');
var Transaction = mongoose.model('Transaction');

router.param('id', function(req, res, next, id){
	Transaction.findById(id).then(function(transaction){
		req.transaction = transaction;
		next();
	}).then(null, next);
});

router.get('/', function(req, res, next){
	Transaction.find(req.query).then(function(transactions){
		res.json(transactions);
	}).then(next);
});

router.post('/', function(req, res, next){
	Transaction.create(req.body).then(function(createdTransaction){
		res.status(201).send(createdTransaction);
	}).then(null, next);
});

router.put('/:id', function(req, res, next){
	for(var i in req.body){
		req.transaction[i] = req.body[i];
	}
	console.log(req.user);
	req.transaction.save().then(function(updatedTransaction){
		res.send(updatedTransaction);
	}).then(null, next);
});

router.delete('/:id', function(req, res, next){
	req.transaction.remove().then(function(deletedTransaction){
		res.send(deletedTransaction);
	}).then(null, next);
});

module.exports = router;