var mongoose = require('mongoose');
require('../../../server/db/models');
var EventProduct = mongoose.model('Event');
var User = mongoose.model('User');
var AuthUser = mongoose.model('AuthUser');
var Ticket = mongoose.model('Ticket');
var eventCreator = require('../../helper/eventCreator');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Tickets Route', function () {
	var guestAgent, ticket, eventId, userId,
			ticketSellerObj = {
				firstName: 'John',
				lastName: 'Smiwth',
				email: 'email@email.com',
				password: 'pwd',
				roles: ['seller', 'admin']
			},
			ticketSeller;


	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});


	beforeEach('create user/event/tickets', function(done) {
		AuthUser
		.create(ticketSellerObj)
		.then(function(user) {
			ticketSeller = user;
			userId = user._id;
			return eventCreator.createEvent();
		}).then(function(e) {
			eventId = e._id;
			var currentDate = new Date();
			return Ticket.create([{eventProduct: e._id, seller: userId, seat: 'awesome', dateSelling: currentDate},
				{eventProduct: e._id, seller: userId, dateSold: currentDate, dateSelling: currentDate}]);
		}).then(function(tickets) {
			ticket = tickets[0];
			done();
		}).then(null, function(err) {
			done(err);
		});
	});

	describe('Get request', function () {
		it('should get all events', function (done) {
			guestAgent.get('/api/tickets')
			.expect(200)
			.end(function(err, res){
				if(err) done(err);
				expect(res.body.length).to.equal(2);
				done();
			});
		});

		it('should get an event by id', function (done) {
			guestAgent.get('/api/tickets/' + ticket._id)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.seat).to.equal('awesome');
					done();
				});
		});
	});


	describe("for logged in users", function () {

		var loggedInAgent;

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(ticketSellerObj).end(done);
		});

		it('should create a new ticket', function (done) {
			var ticketObj = {
				eventProduct: eventId,
				seller: userId,
				seat: 'GA',
				dateSelling: new Date()
			};
			loggedInAgent.post('/api/tickets')
			.send(ticketObj)
			.expect(201)
			.end(function(err, res) {
				loggedInAgent.get('/api/tickets')
				.expect(200)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.length).to.equal(3);
					done();
				});
			});
		});

		it('should update a ticket', function (done) {
			loggedInAgent.put('/api/tickets/' + ticket._id)
			.send({seat: 'Even awesomer'})
			.expect(200)
			.end(function(err, res) {
				loggedInAgent.get('/api/tickets/' + ticket._id)
				.expect(200)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.seat).to.equal('Even awesomer');
					done();
				});
			});
		});

		it('should delete a ticket', function (done) {
			loggedInAgent.delete('/api/tickets/' + ticket._id)
			.expect(204)
			.end(function(err, res) {
				loggedInAgent.get('/api/tickets')
				.expect(200)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.length).to.equal(1);
					done();
				});
			});
		});

	});






});
