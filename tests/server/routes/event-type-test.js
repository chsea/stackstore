// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Event = mongoose.model('Event');
var EventType = mongoose.model('EventType');
var Venue = mongoose.model('Venue');
var Promise = require("bluebird");

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Event Types Routes', function () {

  before(function () {
    process.env.TEST = true;
  });

  before(function () {
    process.env.TEST = false;
  });

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	var guestAgent;

	beforeEach('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});


  var createEventTypes = function (count) {
    var promises = [];
    while (count > 0) {
      promises.push(createEventType());
      count -= 1;
    }
    return Promise.all(promises);
  };


  var createEventType = function () {
    return EventType.create({
            name: 'Backstreet Boys'
    });
  };

	describe('Get request', function () {
		it('should get all event types', function (done) {
      createEventTypes(2)
      .then(function () {
        guestAgent.get('/api/eventtypes')
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.length).to.equal(2);
          done();
        });
      });
		});

		it('should get an event type by id', function (done) {
      createEventType()
      .then(function (createdEventType) {
        var request = '/api/eventtypes/' + createdEventType._id;
        guestAgent.get(request)
        .end(function(err, res){
            if(err) done(err);
            expect(res.body._id).to.equal(createdEventType._id.toString());
            done();
        });
      });
		});

	});

	it('should create a new event type', function (done) {
    createEventType()
    .then(function (createdEventType) {
      guestAgent.post('/api/eventtypes')
      .send({name: 'Concert'})
      .expect(201)
      .end(function(err, res) {
        guestAgent.get('/api/eventtypes')
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.length).to.equal(2);
          done();
        });
      });
    });

	});

  it('should update an event', function (done) {
    createEventType()
    .then(function (createdEventType) {
      var name = "Updated concert name";
      guestAgent.put('/api/eventtypes/' + createdEventType._id)
      .send({name: name})
      .expect(200)
      .end(function(err, res) {
        guestAgent.get('/api/eventtypes/' + createdEventType._id)
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.name).to.equal(name);
          done();
        });
      });
    });

  });

  it('should delete an event type', function (done) {

    createEventType().
    then(function (createdEventType) {
      guestAgent.delete('/api/eventtypes/' + createdEventType._id)
      .expect(204)
      .end(function(err, res) {
        guestAgent.get('/api/eventtypes')
        .expect(200)
        .end(function(err, res){
          if(err) done(err);
          expect(res.body.length).to.equal(0);
          done();
        });
      });
    });

  });
});
