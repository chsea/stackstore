// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Transaction = mongoose.model('Transaction');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');
var eventProduct = mongoose.model('EventProduct');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('transactions Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	var guestAgent;
	var transaction1;
	var event1;
	var user1;
	var ticket1;
	var user2;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});

	beforeEach('Create transactions', function (done) {
		guestAgent = supertest.agent(app);
		User.create({
            email: 'testing@fsa.com',
            password: 'password',
            firstName: 'Tim',
            lastName: 'Othy',
        }).then(function(user){
        	user1 = user;
        	return User.create({
	            email: 'testing2@fsa.com',
	            password: 'password2',
	            firstName: 'John',
	            lastName: 'Smith'
	        });
        }).then(function(user){
        	user2 = user;
        	return eventProduct.create({
    	    	name: 'sexy fun times',
			    date: 74893047823904,
			});
        }).then(function(eventProduct){
        	event1 = eventProduct;
        	return Ticket.create({
			    eventProduct: eventProduct._id,
			    seller: user1._id,
			    price: 3, //min $0.01
			});
        }).then(function(ticket){
        	ticket1 = ticket;
        	return Transaction.create({
	            buyer: user1._id,
	            seller: user2._id,
	            ticket: ticket1._id,
	            date: 342384929348,
	            quantity: 2
        	});
        }).then(function(transaction){
        	transaction1 = transaction;
        	return Transaction.create({
	            buyer: user2._id,
	            seller: user1._id,
	            ticket: ticket1._id,
	            date: 342384229348,
	            quantity: 2
	        });
        }).then(function(){
        	done();
        })
        .then(null, done);
	});

	describe('Get', function () {
		it('should get a 200 response', function (done) {
			guestAgent.get('/api/transactions')
				.expect(200)
				.end(done);
		});

		it('should get all transactions', function (done) {
			guestAgent.get('/api/transactions')
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.length).to.equal(2);
					done();
				});
		});

		it('can get by id through queries', function (done) {
			guestAgent.get('/api/transactions?_id=' + transaction1._id)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.length).to.equal(1);
					done();
				});
		});
	});

	describe('Post', function () {
		it('should get a 201 response', function (done) {
			guestAgent.post('/api/transactions')
				.send({
		            buyer: user1._id,
		            seller: user2._id,
		            ticket: ticket1._id,
		            date: 342384929348,
		            quantity: 4
		        })
	        	.expect(201)
				.end(done);
		});

		it('should create a new transaction', function (done) {
			guestAgent.post('/api/transactions')
				.send({
		            buyer: user1._id,
		            seller: user2._id,
		            ticket: ticket1._id,
		            date: 342384929348,
		            quantity: 4
		        })
				.end(function(err, res){
					guestAgent.get('/api/transactions?_id=' + res.body._id)
						.end(function(err, res){
							if(err) done(err);
							expect(res.body[0].quantity).to.equal(4);
							done();
						});
				});
		});
	});

	describe('Put', function () {
		it('should get a 200 response', function (done) {
			guestAgent.put('/api/transactions/' + transaction1._id)
				.expect(200)
				.end(done);
		});

		it('should update a transaction', function (done) {
			guestAgent.put('/api/transactions/' + transaction1._id)
				.send({
		            "quantity": 7
		        })
				.end(function(err, res){
					guestAgent.get('/api/transactions?_id=' + transaction1._id)
						.end(function(err, res){
							if(err) done(err);
							expect(res.body[0].quantity).to.equal(7);
							done();
						});
				});
		});

	});

	describe('Delete', function () {
		it('should get a 200 response', function (done) {
			guestAgent.delete('/api/transactions/' + transaction1._id)
				.expect(200)
				.end(done);
		});

		it('should delete the transaction', function (done) {
			guestAgent.delete('/api/transactions/' + transaction1._id)
				.end(function(err, res){
					guestAgent.get('/api/transactions?_id=' + transaction1._id)
						.end(function(err, res){
							if(err) done(err);
							expect(res.body.length).to.equal(0);
							done();
						});
				});
		});
	});

});