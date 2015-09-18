  var Promise = require('bluebird');
  var mongoose = require('mongoose');
  require('../../server/db/models');
  var Event = mongoose.model('Event');
  var EventType = mongoose.model('EventType');
  var Venue = mongoose.model('Venue');

  module.exports.createEvents = function (count) {
    var promises = [];
    while (count > 0) {
      promises.push(this.createEvent());
      count -= 1;
    }
    return Promise.all(promises);
  };


  module.exports.createEvent = function () {
    var eventType;
    return EventType.create({
            name: 'Backstreet Boys'
        })
        .then(function(newEventType) {
            eventType = newEventType;
            return Venue.create({
                name: 'Madison Square Garden',
                address: {
                  streetAddress: '4 Pennsylvania Plaza',
                  city: 'New York',
                  state: 'NY',
                  zip: 10001
                },
                coordinates: [40.7505045, -73.9934387],
                seatingMapUrl: '/images/madisonSqGardenSeatMap.png'
            });
        })
        .then(function (newVenue) {
          return Event.create({
            EventType: eventType,
            Venue: newVenue,
            date: new Date()
          });
        });
  };

