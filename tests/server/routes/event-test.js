// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var EventProduct = mongoose.model('EventProduct');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Events Route', function () {
	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	var guestAgent, createdEvent;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});

	beforeEach('Create an event', function (done) {
		EventProduct
    .create([{name: 'BSB at MSG', date: new Date()}, {name: 'LOL at MSG', date: new Date()}])
    .then(function(events) {
      createdEvent = events[0];
      done();
    }).then(null, done);
	});

	describe('Get request', function () {
		it('should get all events', function (done) {
			guestAgent.get('/api/events')
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.length).to.equal(2);
        done();
      });
		});

		it('should get an event by id', function (done) {
			guestAgent.get('/api/events/' + createdEvent._id)
				.end(function(err, res){
					if(err) done(err);
					expect(res.body.name).to.equal('BSB at MSG');
					done();
				});
		});
	});

	it('should create a new event', function (done) {
		guestAgent.post('/api/events')
    .send({name: '3EB at MSG', date: new Date()})
    .expect(201)
    .end(function(err, res) {
      guestAgent.get('/api/events')
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.length).to.equal(3);
        done();
      });
    });
	});

  it('should update an event', function (done) {
		guestAgent.put('/api/events/' + createdEvent._id)
    .send({name: '3EB at MSG'})
    .expect(200)
    .end(function(err, res) {
      guestAgent.get('/api/events/' + createdEvent._id)
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.name).to.equal('3EB at MSG');
        done();
      });
    });
	});

  it('should delete an event', function (done) {
		guestAgent.delete('/api/events/' + createdEvent._id)
    .expect(204)
    .end(function(err, res) {
      guestAgent.get('/api/events')
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        expect(res.body.length).to.equal(1);
        done();
      });
    });
	});
});
