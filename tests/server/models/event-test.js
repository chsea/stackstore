var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var EventProduct = mongoose.model('EventProduct');
var Ticket = mongoose.model('Ticket');
var User = mongoose.model('User');

describe('Event model', function () {

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
      expect(EventProduct).to.be.a('function');
  });

  describe("creation", function () {

    var eventRequiredFieldsTests = [
      {eventObj: {date: new Date(), category: 'Concert'}, reqField: 'name'},
      {eventObj: {name: "BSB at MSG", category: 'Concert'}, reqField: "date"}
    ];

    eventRequiredFieldsTests.forEach(function (test) {
      it("should require " + test.reqField, function (done) {
        EventProduct.create(test.eventObj)
        .then(function(){
          done(new Error("Event should require a " + test.reqField + "."));
        })
        .then(null, function(err){
          try {
              expect(err.errors.hasOwnProperty(test.reqField)).to.equal(true);
              expect(err.errors[test.reqField].name).to.equal('ValidatorError');
              expect(err.errors[test.reqField].properties.path).to.equal(test.reqField);
              expect(err.errors[test.reqField].properties.type).to.equal('required');
              done();
          } catch (e) {
              console.error("ERROR:", e);
              done(e);
          }
        });
      });
    });

    it('should save category with the correct default value', function(done) {
      EventProduct.create({name: 'BSB at MSG', date: new Date()}).then(function(e) {
        expect(e.category).to.equal('Other');
        done();
      });
    });
  });

  describe("statics", function() {
    it('should have a function that finds and updates a document', function(done) {
      EventProduct
      .create({name: 'BSB at MSG', date: new Date()})
      .then(function(e) {
        return EventProduct.findAndUpdate(e._id, {name: 'KaChing Gallery Opening'});
      })
      .then(function(e) {
        return EventProduct.findById(e._id).exec();
      }).then(function(e) {
        expect(e.name).to.equal('KaChing Gallery Opening');
        done();
      }).then(null, function(err) {
        console.log('Errored with', err);
        done(err);
      });
    });
  });

  describe("methods", function(done) {
    it('should keep the correct inventory', function(done) {
      var userId, createdEvent;
      User
      .create({firstName: 'Omri', lastName: 'Bernstein', email: 'zeke@zeke.zeke', password: 'groovy'})
      .then(function(user) {
        var userId = user._id;
        return EventProduct.create({name: 'BSB at MSG', date: new Date()});
      }).then(function(e) {
        console.log('event ', e);
        createdEvent = e;
        return Ticket.create([{eventProduct: e._id, seller: userId}, {eventProduct: e._id, seller: userId, sold: true}]);
      }).then(function(ticket) {
        console.log('ticket', ticket);
        expect(createdEvent.inventory()).to.equal(1);
        expect(createdEvent.ticketsSold()).to.equal(1);
        done();
      }).then(null, function(err) {
        done(err);
      });
    });
  });

  describe("virtuals", function(done) {
    it('should have a property that denotes if the event has expired', function(done) {
      EventProduct
      .create({name: 'BSB at MSG', date: new Date(1995, 11, 19)})
      .then(function(e) {
        expect(e.expired).to.equal(true);
        done();
      })
      .then(null, function(err) {
        done(err);
      });
    });
  });
});
