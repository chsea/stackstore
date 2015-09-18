var mongoose = require('mongoose');
require('../../../server/db/models');
var EventProduct = mongoose.model('Event');
var User = mongoose.model('User');
var Ticket = mongoose.model('Ticket');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Tickets Route', function () {
  var guestAgent, ticket, eventId, userId;
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
    User
    .create({firstName: 'Omri', lastName: 'Bernstein', email: 'zeke@zeke.zeke', password: 'groovy'})
    .then(function(user) {
      userId = user._id;
      return EventProduct.create({name: 'BSB at MSG', date: new Date()});
    }).then(function(e) {
      eventId = e._id;
      return Ticket.create([{eventProduct: e._id, seller: userId, seat: 'awesome'}, {eventProduct: e._id, seller: userId, sold: true}]);
    }).then(function(tickets) {
      ticket = tickets[0];
      done();
    }).then(null, function(err) {
      done(err);
    });
  });

	describe('Get request', function () {
		it('should get all events', function (done) {
			guestAgent.get('/api/events/' + eventId + '/tickets')
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.length).to.equal(2);
        done();
      });
		});

		it('should get an event by id', function (done) {
			guestAgent.get('/api/events/' + eventId + '/tickets/' + ticket._id)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.seat).to.equal('awesome');
					done();
				});
		});
	});

	it('should create a new ticket', function (done) {
		guestAgent.post('/api/events/' + eventId + '/tickets')
    .send({eventProduct: eventId, seller: userId})
    .expect(201)
    .end(function(err, res) {
      guestAgent.get('/api/events/' + eventId + '/tickets')
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.length).to.equal(3);
        done();
      });
    });
	});

  it('should update a ticket', function (done) {
  	guestAgent.put('/api/events/' + eventId + '/tickets/' + ticket._id)
    .send({seat: 'Even awesomer'})
    .expect(200)
    .end(function(err, res) {
      guestAgent.get('/api/events/' + eventId + '/tickets/' + ticket._id)
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.seat).to.equal('Even awesomer');
        done();
      });
    });
  });

  it('should delete a ticket', function (done) {
		guestAgent.delete('/api/events/' + eventId + '/tickets/' + ticket._id)
    .expect(204)
    .end(function(err, res) {
      guestAgent.get('/api/events/' + eventId + '/tickets')
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.length).to.equal(1);
        done();
      });
    });
	});
});
