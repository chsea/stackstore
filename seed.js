/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var AuthUser = Promise.promisifyAll(mongoose.model('AuthUser'));
var Venue = Promise.promisifyAll(mongoose.model('Venue'));
var EventProduct = Promise.promisifyAll(mongoose.model('EventProduct'));
var Ticket = Promise.promisifyAll(mongoose.model('Ticket'));
var Transaction = Promise.promisifyAll(mongoose.model('Transaction'));

var seedUsers = function() {
  var users = [{
    firstName: 'Sam',
    lastName: 'Hartman',
    email: 'kobe@riot.com',
    address: {
      street: '123 League Drive',
      city: 'Santa Monica',
      state: 'CA',
      zip: '90012'
    }
  }, {
    firstName: 'Josh',
    lastName: 'Leesman',
    email: 'jatt@riot.com',
    address: {
      street: '123 League Drive',
      city: 'Santa Monica',
      state: 'CA',
      zip: '90012'
    }
  }];

  return User.createAsync(users);
};

var seedAuthUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password',
        firstName: 'Tim',
        lastName: 'Othy',
        address: {
          street: '123 League Drive',
          city: 'Santa Monica',
          state: 'CA',
          zip: '90012'
        }
    }, {
        email: 'obama@gmail.com',
        password: 'potus',
        firstName: 'John',
        lastName: 'Smith',
        address: {
          street: '123 League Drive',
          city: 'Santa Monica',
          state: 'CA',
          zip: '90012'
        }
    }, {
        email: 'cristina@fsa.com',
        password: 'millenium',
        firstName: 'Cristina',
        lastName: 'Colón',
        address: {
          street: '123 League Drive',
          city: 'Santa Monica',
          state: 'CA',
          zip: '90012'
        }
    }, {
        email: 'chsea@fsa.com',
        password: 'bsbforlife',
        firstName: 'Chel',
        lastName: 'Du',
        address: {
          street: '123 League Drive',
          city: 'Santa Monica',
          state: 'CA',
          zip: '90012'
        }
    }, {
        email: 'danielp@fsa.com',
        password: 'millenium',
        firstName: 'Daniel',
        lastName: 'Perelly',
        address: {
          street: '123 League Drive',
          city: 'Santa Monica',
          state: 'CA',
          zip: '90012'
        }
    }, {
        email: 'danielm@fsa.com',
        password: 'millenium',
        firstName: 'Daniel',
        lastName: 'Moenich',
        address: {
          street: '123 League Drive',
          city: 'Santa Monica',
          state: 'CA',
          zip: '90012'
        }
    }];

    return AuthUser.createAsync(users);

};

var seedVenues = function() {

    var venues = [{
        name: 'Madison Square Garden',
        streetAddress: '4 Pennsylvania Plaza',
        city: 'New York',
        state: 'NY',
        zip: 10001,
        coordinates: [40.7505045,-73.9934387],
        seatingMapUrl: '/images/madisonSqGardenSeatMap.png'
    }, {
        name: 'Richard Rodgers Theatre',
        streetAddress: '226 West 46th Street',
        city: 'New York',
        state: 'NY',
        zip: 10036,
        coordinates: [40.7590431,-73.9866326],
        seatingMapUrl: '/images/richardRodgersSeatMap.png'
    }, {
        name: 'Citi Field',
        streetAddress: '123-01 Roosevelt Ave',
        city: 'New York',
        state: 'NY',
        zip: 11368,
        coordinates: [40.7570877,-73.8458213],
        seatingMapUrl: '/images/citiFieldSeatMap.png'
    }, {
        name: 'Webster Hall',
        streetAddress: '125 East 11th St.',
        city: 'New York',
        state: 'NY',
        zip: 10003,
        coordinates: [40.731763,-73.9891298]
    }, {
        name: 'Barclays Center',
        streetAddress: '620 Atlantic Ave',
        city: 'Brooklyn',
        state: 'NY',
        zip: 11217,
        coordinates: [40.6825236,-73.9750134]
    }, {
        name: 'Yankee Stadium',
        streetAddress: '620 Atlantic Ave',
        city: 'Bronx',
        state: 'NY',
        zip: 11217,
        coordinates: [40.6825236,-73.9750134]
    }];

    return Venue.createAsync(venues);

};

var seedEvents = function() {
    var venueDict={};
    var events = [
      {
          name: 'BSB',
          imgUrl: '/images/stromae.jpeg',
          date: new Date(2014, 10, 1, 20, 0, 0),
          venue: 'Madison Square Garden',
          category: 'Concert'
      },
      {
        name: 'Stromae and Janelle Monae',
        imgUrl: '/images/stromae.jpeg',
        date: new Date(2015, 10, 1, 20, 0, 0),
        venue: 'Madison Square Garden',
        category: 'Concert'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        date: new Date(2015,9,24,19,0,0), // thurs 9/24 @ 7pm
        venue: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        date: new Date(2015,9,25,20,0,0), // fri 9/25 @ 8pm
        venue: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        date: new Date(2015,9,26,14,0,0), // sat 9/26 @ 2pm
        venue: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        date: new Date(2015,9,26,20,0,0), // sat 9/26 @ 8pm
        venue: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        date: new Date(2015,9,27,15,0,0), // sun 9/27 @ 3pm
        venue: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        date: new Date(2015,9,29,19,0,0), // tues 9/29 @ 7pm
        venue: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        date: new Date(2015,9,30,14,0,0), // wed 9/30 @ 2pm
        venue: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Washington Nationals at New York Mets',
        imgUrl: '/images/natsVsMets.jpg',
        date: new Date(2015,10,2,19,10,0), // fri oct 2 @ 7:10pm
        venue: 'Citi Field',
        category: 'Sports'
    }, {
        name: 'Washington Nationals at New York Mets',
        imgUrl: '/images/natsVsMets.jpg',
        date: new Date(2015,10,3,19,10,0), // sat oct 3 @ 7:10pm
        venue: 'Citi Field',
        category: 'Sports'
    }, {
        name: 'Washington Nationals at New York Mets',
        imgUrl: '/images/natsVsMets.jpg',
        date: new Date(2015,10,4,15,10,0), // sun oct 4 @ 3:10pm
        venue: 'Citi Field',
        category: 'Sports'
    }, {
        name: 'Rudimental',
        date: new Date(2015,9,29,19,0,0),
        venue: 'Webster Hall',
        category: 'Concert'
    }];

    return Venue.find().select('name _id')
        .then(function(venues){
          venues.forEach(function(venue) {
            venueDict[venue.name] = venue._id;
          });
          events.forEach(function(e) {
            e.venue = venueDict[e.venue];
          });
        })
        .then(function(){
          return EventProduct.createAsync(events);
        });
};

var seedTickets = function() {
    var eventDict={};
    var userDict={};

    var tickets = [{
        eventProduct: 'BSB',
        seller: 'chsea@fsa.com',
        buyer: 'obama@gmail.com',
        price: '1000',
        sold: true
    },
    {
        eventProduct: 'BSB',
        seller: 'obama@gmail.com',
        buyer: 'kobe@riot.com',
        price: '1000',
        sold: true
    },
    {
        eventProduct: 'BSB',
        seller: 'obama@gmail.com',
        price: '1000'
    },{
        eventProduct: 'Hamilton',
        seller: 'obama@gmail.com',
        price: '1000'
    }, {
        eventProduct: 'Hamilton',
        seller: 'obama@gmail.com',
        price: '1000'
    }, {
        eventProduct: 'Hamilton',
        seller: 'chsea@fsa.com',
        buyer: 'obama@gmail.com',
        price: '700',
        sold: true
    }, {
        eventProduct: 'Hamilton',
        seller: 'chsea@fsa.com',
        price: '500'
    }, {
        eventProduct: 'Hamilton',
        seller: 'danielp@fsa.com',
        price: '500'
    }, {
        eventProduct: 'Hamilton',
        seller: 'danielp@fsa.com',
        price: '1000'
    }, {
        eventProduct: 'Stromae and Janelle Monae',
        seller: 'danielm@fsa.com',
        price: '75'
    }, {
        eventProduct: 'Stromae and Janelle Monae',
        seller: 'danielm@fsa.com',
        price: '75'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'obama@gmail.com',
        price: '40'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'obama@gmail.com',
        price: '40'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'obama@gmail.com',
        price: '40'
    },{
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'obama@gmail.com',
        price: '40'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'cristina@fsa.com',
        price: '50'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'obama@gmail.com',
        price: '50'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'cristina@fsa.com',
        price: '50'
    },{
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'cristina@fsa.com',
        price: '75'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'chsea@fsa.com',
        price: '75'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'chsea@fsa.com',
        price: '75'
    }, {
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'chsea@fsa.com',
        price: '75'
    },{
        eventProduct: 'Washington Nationals at New York Mets',
        seller: 'chsea@fsa.com',
        price: '50'
    }, {
        eventProduct: 'Rudimental',
        seller: 'testing@fsa.com',
        price: '25'
    }, {
        eventProduct: 'Rudimental',
        seller: 'testing@fsa.com',
        price: '25'
    }
    ];

    var eventIds = {};
    return EventProduct.find().then(function(events) {
      events.forEach(function(event){
        eventIds[event.name] = event._id;
      });
      return User.find().exec();
    }).then(function(users) {
      var userIds = {};
      users.forEach(function(user) {
        userIds[user.email] = user._id;
      });

      return userIds;
    }).then(function(userIds) {
      tickets.forEach(function(ticket) {
        ticket.eventProduct = eventIds[ticket.eventProduct];
        ticket.seller = userIds[ticket.seller];
        ticket.buyer = userIds[ticket.buyer];
      });
    }).then(function() {
      return Ticket.createAsync(tickets);
    });
};



connectToDb.then(function() {
    // commented out the safety check because need to reseed Users
    // User.findAsync({})
    //     .then(function(users) {
    //         if (users.length === 0) {
    //             return seedUsers();
    //         } else {
    //             console.log(chalk.magenta('Seems to already have user data, moving on to others.'));
    //     }})
        User.remove({})
        .then(function(){return EventProduct.remove({}); })
        .then(function(){return Venue.remove({}); })
        .then(function(){return Ticket.remove({}); })
        .then(function(){
          return seedUsers();
        }).then(function(users){
          return seedAuthUsers();
        }).then(function(authUsers){
          return seedVenues(); })
        .then(function(venues){
          return seedEvents();
        }).then(function(events){
          return seedTickets();
        }).then(function(tickets) {
          console.log(chalk.green('Seeding was successful!'));
          process.kill(0);
        })
        .catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});
