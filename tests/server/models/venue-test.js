var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Venue = mongoose.model('Venue');

describe('Venue model', function () {

  beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
      clearDB(done);
  });

  it('should exist', function () {
      expect(Venue).to.be.a('function');
  });

  describe("creation", function () {

    var missingName = {
      //name: 'Madison Square Garden',
      streetAddress: 'somewhere along 7th Ave and 32nd St.',
      city: 'New York',
      state: 'NY',
      zip: 10001
    };

    var missingStreetAddress = {
      name: 'Richard Rodgers Theater',
      //streetAddress: 'somewhere in the Theater District',
      city: 'New York',
      state: 'NY',
      zip: 10036
    };

    var missingCity = {
      name: 'Madison Square Garden',
      streetAddress: 'somewhere along 7th Ave and 32nd St.',
      city: 'New York',
      state: 'NY',
      zip: 10001
    };

    var missingState = {
      name: 'Richard Rodgers Theater',
      streetAddress: 'somewhere in the Theater District',
      city: 'New York',
      state: 'NY',
      zip: 10036
    };

    var missingZip = {
      name: 'Richard Rodgers Theater',
      streetAddress: 'somewhere in the Theater District',
      city: 'New York',
      state: 'NY',
      zip: 10036
    };

    var venueRequiredFieldsTests = [
      {venue: missingName, reqField: 'name'},
      {venue: missingStreetAddress, reqField: 'streetAddress'},
      {venue: missingCity, reqField: 'city'},
      {venue: missingState, reqField: 'state'},
      {venue: missingZip, reqField: 'zip'}
    ];

    venueRequiredFieldsTests.forEach(function (test) {
      it("should require " + test.reqField, function (done) {
        Venue.create(test.venue)
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

    xit('should save category with the correct default value', function(done) {
      EventProduct.create({name: 'BSB at MSG', date: new Date()}).then(function(e) {
        expect(e.category).to.equal('Other');
        done();
      });
    });
  });

  describe("statics", function() {
    xit('should have a function that finds and updates a document', function(done) {
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
    xit('should keep the correct inventory', function(done) {
      var userId, createdEvent;
      User
      .create({firstName: 'Omri', lastName: 'Bernstein', email: 'zeke@zeke.zeke', password: 'groovy'})
      .then(function(user) {
        console.log('user ', user);
        var userId = user._id;
        return EventProduct.create({name: 'BSB at MSG', date: new Date()});
      }).then(function(e) {
        console.log('event ', user);
        createdEvent = e;
        return Ticket.create([{eventProduct: e._id, seller: userId}, {eventProduct: e._id, seller: userId, sold: true}]);
      }).then(function(ticket) {
        expect(createdEvent.inventory()).to.equal(1);
        expect(createdEvent.ticketsSold()).to.equal(1);
        done();
      }).then(null, function(err) {
        done(err);
      });
    });
  });

  describe("virtuals", function(done) {
    xit('should have a property that denotes if the event has expired', function(done) {
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
