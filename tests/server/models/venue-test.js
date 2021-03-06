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

  var validVenue = {
      name: 'Madison Square Garden',
      address: {
        streetAddress: 'somewhere along 7th Ave and 32nd St.',
        city: 'New York',
        state: 'NY',
        zip: 10001        
      }
    };

  describe("creation", function () {

    var missingName = {
        //name: 'Madison Square Garden',
        address: {
          streetAddress: 'somewhere along 7th Ave and 32nd St.',
          city: 'New York',
          state: 'NY',
          zip: 10001        
        }
      };

    var missingStreetAddress = {
      name: 'Richard Rodgers Theatre',
      address: {
        //streetAddress: 'somewhere in the Theater District',
        city: 'New York',
        state: 'NY',
        zip: 10036
      }
    };

    var missingCity = {
        name: 'Madison Square Garden',
        address: {
          streetAddress: 'somewhere along 7th Ave and 32nd St.',
          //city: 'New York',
          state: 'NY',
          zip: 10001        
        }
      };

    var missingState = {
      name: 'Richard Rodgers Theatre',
      address: {
        streetAddress: 'somewhere in the Theater District',
        city: 'New York',
        //state: 'NY',
        zip: 10036
      }
    };

    var missingZip = {
      name: 'Webster Hall',
      address: {
        streetAddress: 'somewhere in the East Village',
        city: 'New York',
        state: 'NY',
        //zip: 10036
      }
    };

    var venueRequiredFieldsTests = [
      {venue: missingName, reqField: 'name'},
      {venue: missingStreetAddress, reqField: 'address.streetAddress'},
      {venue: missingCity, reqField: 'address.city'},
      {venue: missingState, reqField: 'address.state'},
      {venue: missingZip, reqField: 'address.zip'}
    ];

    venueRequiredFieldsTests.forEach(function (test) {
      it("should require " + test.reqField, function (done) {
        Venue.create(test.venue)
        .then(function(){
          done(new Error("Venue should require a " + test.reqField + "."));
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
      Venue.create(validVenue).then(function(created) {
        expect(created.category).to.equal('Other');
        done();
      });
    });
  });

  describe("statics", function() {
    // none yet
  });

  describe("methods", function(done) {
    // none yet
  });

  describe("virtuals", function(done) {
    // none yet
  });
});
