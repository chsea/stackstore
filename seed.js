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
var Event = Promise.promisifyAll(mongoose.model('Event'));
var EventType = Promise.promisifyAll(mongoose.model('EventType'));
var Ticket = Promise.promisifyAll(mongoose.model('Ticket'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

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
    },
    roles: [
      'buyer',
      'seller',
      'admin'
    ]
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
    },
    roles: [
      'buyer',
      'seller'
    ]
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
    },
    roles: [
      'buyer',
      'seller'
    ]
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
    },
    roles: [
      'buyer',
      'seller'
    ]
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
        address: {
            streetAddress: '4 Pennsylvania Plaza',
            city: 'New York',
            state: 'NY',
            zip: 10001
        },
        coordinates: [40.7505045,-73.9934387],
        seatingMapUrl: '/images/madisonSqGardenSeatMap.png'
    }, {
        name: 'Richard Rodgers Theatre',
        address: {
            streetAddress: '226 West 46th Street',
            city: 'New York',
            state: 'NY',
            zip: 10036
        },
        coordinates: [40.7590431,-73.9866326],
        seatingMapUrl: '/images/richardRodgersSeatMap.png'
    }, {
        name: 'Citi Field',
        address: {
            streetAddress: '123-01 Roosevelt Ave',
            city: 'New York',
            state: 'NY',
            zip: 11368
        },
        coordinates: [40.7570877,-73.8458213],
        seatingMapUrl: '/images/citiFieldSeatMap.png'
    }, {
        name: 'Webster Hall',
        address: {
            streetAddress: '125 East 11th St.',
            city: 'New York',
            state: 'NY',
            zip: 10003
        },
        coordinates: [40.731763,-73.9891298]
    }, {
        name: 'Barclays Center',
        address: {
            streetAddress: '620 Atlantic Ave',
            city: 'Brooklyn',
            state: 'NY',
            zip: 11217
        },
        coordinates: [40.6825236,-73.9750134]
    }, {
        name: 'Yankee Stadium',
        address: {
            streetAddress: '620 Atlantic Ave',
            city: 'Bronx',
            state: 'NY',
            zip: 11217
        },
        coordinates: [40.6825236,-73.9750134]
    }, {
        name: "MetLife Stadium",
        address: {
            streetAddress: "1 MetLife Stadium Dr",
            city: "East Rutherford",
            state: "NJ",
            zip: 07073,
        },
        coordinates: [40.8128397,-74.0742091]
    }, {
        name: "Hammerstein Ballroom",
        address: {
            streetAddress: "311 W 34th St",
            city: "New York",
            state: "NY",
            zip: 10001,
        },
        coordinates: [40.7529135,-73.9941388]
    }, {
        name: "Carnegie Hall",
        address: {
            streetAddress: "881 7th Ave",
            city: "New York",
            state: "NY",
            zip: 10019,
        },
        coordinates: [40.7651258,-73.9799236]
    }, {
        name: "The Javits Center",
        address: {
            streetAddress: "655 W 34th St",
            city: "New York",
            state: "NY",
            zip: 10001,
        },
        coordinates: [40.7579367,-74.0024897]
    }, {
        name: "Music Hall of Williamsburg",
        address: {
            streetAddress: "66 N 6th St",
            city: "Brooklyn",
            state: "NY",
            zip: 11211,
        },
        coordinates: [40.7191396,-73.9617418]
    }];

    return Venue.createAsync(venues);

};


var seedEventTypes = function () {

    var eventTypes = [{
        name: 'Stromae and Janelle Monae',
        imgUrl: '/images/stromae.jpeg',
        category: 'Concert'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg',
        category: 'Theater'
    }, {
        name: 'Washington Nationals at New York Mets',
        imgUrl: '/images/natsVsMets.jpg',
        category: 'Sports',
        tags: ['Sports', 'Baseball']
    }, {
        name: 'Rudimental',
        category: 'Concert'
    }, {
        name: "R. Kelly",
        category:"Concert",
        imgUrl: '/images/rkelly.jpg'
    }, {
        name: "Ariana Grande with Prince Royce",
        category: "Concert",
        imgUrl: '/images/ariana.jpeg'
    }, {
        name: "Ariana Grande",
        category: "Concert",
        imgUrl: '/images/ariana.jpeg'
    }, {
        name: "Marc Anthony and Carlos Vives",
        category: "Concert",
        imgUrl: '/images/marc.jpg'
    }, {
        name: "New York Comic Con",
        category: "Conference",
        imgUrl: '/images/comiccon.png'
    }, {
        name: "Gwen Stefani",
        category: "Concert",
        imgUrl: '/images/gwen.jpg',
        tags: ['Concert', 'Pop']
    }, {
        name: "Daddy Yankee",
        category: "Concert"
    }, {
        name: "Billy Joel",
        category:"Concert",
        imgUrl: '/images/billyjoel.jpg'
    }, {
        name: "The Weeknd",
        category:"Concert",
        imgUrl: '/images/weeknd.jpg'
    }, {
        name: 'BSB',
        category: 'Concert',
        imgUrl: '/images/bsb.png'
    }, {
        name: 'Chicago White Sox at New York Yankees',
        imgUrl: '/images/whiteSoxVsYankees.jpg',
        category: 'Sports',
        tags: ['Sports', 'Baseball']
    }, {
        name: 'New Jersey Devils at New York Rangers Preseason',
        imgUrl: '/images/nyRangers.jpg',
        category: 'Sports',
        tags: ['Sports', 'Hockey']
    }, {
        name: 'Philadelphia Flyers at New York Rangers Preseason',
        imgUrl: '/images/nyRangers.jpg',
        category: 'Sports',
        tags: ['Sports', 'Hockey']
    }, {
        name: 'Boston Bruins at New York Rangers Preseason',
        imgUrl: '/images/nyRangers.jpg',
        category: 'Sports',
        tags: ['Sports', 'Hockey']
    // }, {
    //     name: '',
    //     imgUrl: '/images/',
    //     category: 'Sports',
    //     tags: ['Sports', 'Hockey']
    }];

  return EventType.createAsync(eventTypes);
};

var createdEvents;
var seedEvents = function() {

    var venueDict={};
    var eventTypeDict = {};
    var events = [{
        eventTypeName: 'Stromae and Janelle Monae',
        date: new Date(2015, 9, 1, 20, 0, 0),
        venueName: 'Madison Square Garden'
    },{
        eventTypeName: 'BSB',
        date: new Date(2014, 10, 1, 20, 0, 0),
        venueName: 'Madison Square Garden'
    }, {
        eventTypeName: 'Hamilton',
        date: new Date(2015,8,24,19,0,0), // thurs 9/24 @ 7pm
        venueName: 'Richard Rodgers Theatre'
    }, {
        eventTypeName: 'Hamilton',
        date: new Date(2015,8,25,20,0,0), // fri 9/25 @ 8pm
        venueName: 'Richard Rodgers Theatre'
    }, {
        eventTypeName: 'Hamilton',
        date: new Date(2015,8,26,14,0,0), // sat 9/26 @ 2pm
        venueName: 'Richard Rodgers Theatre'
    }, {
        eventTypeName: 'Hamilton',
        date: new Date(2015,8,26,20,0,0), // sat 9/26 @ 8pm
        venueName: 'Richard Rodgers Theatre'
    }, {
        eventTypeName: 'Hamilton',
        date: new Date(2015,8,27,15,0,0), // sun 9/27 @ 3pm
        venueName: 'Richard Rodgers Theatre'
    }, {
        eventTypeName: 'Hamilton',
        date: new Date(2015,8,29,19,0,0), // tues 9/29 @ 7pm
        venueName: 'Richard Rodgers Theatre'
    }, {
        eventTypeName: 'Hamilton',
        date: new Date(2015,8,30,14,0,0), // wed 9/30 @ 2pm
        venueName: 'Richard Rodgers Theatre'
    }, {
        eventTypeName: 'Washington Nationals at New York Mets',
        date: new Date(2015,9,2,19,10,0), // fri oct 2 @ 7:10pm
        venueName: 'Citi Field'
    }, {
        eventTypeName: 'Washington Nationals at New York Mets',
        date: new Date(2015,9,3,19,10,0), // sat oct 3 @ 7:10pm
        venueName: 'Citi Field'
    }, {
        eventTypeName: 'Washington Nationals at New York Mets',
        date: new Date(2015,9,4,15,10,0), // sun oct 4 @ 3:10pm
        venueName: 'Citi Field'
    }, {
        eventTypeName: 'Rudimental',
        date: new Date(2015,8,29,19,0,0),
        venueName: 'Webster Hall'
    }, {
        eventTypeName: "R. Kelly",
        venueName: "Barclays Center",
        date: new Date(2015,8,25,20,0,0) // Fri Sep 25 at 8pm
    }, {
        eventTypeName: "Ariana Grande with Prince Royce",
        venueName: "Barclays Center",
        date: new Date(2015,8,26,19,30,0) // Sat Sep 26 at 7:30pm
    }, {
        eventTypeName: "Ariana Grande",
        venueName: "Barclays Center",
        date: new Date(2015,8,27,19,30,0) // Sun Sep 27 at 7:30pm
    }, {
        eventTypeName: "Marc Anthony and Carlos Vives",
        venueName: "Barclays Center",
        date: new Date(2015,9,8,20,0,0) // Thurs Oct 8 at 8pm
    }, {
        eventTypeName: "New York Comic Con",
        venueName: "The Javits Center",
        date: new Date(2015,9,8,10,0,0) // Thurs Oct 8 at 10am (all day)
    }, {
        eventTypeName: "New York Comic Con",
        venueName: "The Javits Center",
        date: new Date(2015,9,9,10,0,0) // Fri Oct 9 at 10am (all day)
    }, {
        eventTypeName: "New York Comic Con",
        venueName: "The Javits Center",
        date: new Date(2015,9,10,10,0,0) // Sat Oct 10 at 10am (all day)
    }, {
        eventTypeName: "New York Comic Con",
        venueName: "The Javits Center",
        date: new Date(2015,9,11,10,0,0) // Sun Oct 11 at 10am (all day)
    }, {
        eventTypeName: "Gwen Stefani",
        venueName: "Hammerstein Ballroom",
        date: new Date(2015,9,17,20,0,0) // Sat Oct 17 at 8pm
    }, {
        eventTypeName: "Daddy Yankee",
        venueName: "Madison Square Garden",
        date: new Date(2015,8,19,20,0,0) // Sat Sep 19 at 8pm
    }, {
        eventTypeName: "Billy Joel",
        venueName: "Madison Square Garden",
        date: new Date(2015,8,26,20,0,0) // Sat Sep 26 at 8pm
    }, {
        eventTypeName: "Billy Joel",
        venueName: "Madison Square Garden",
        date: new Date(2015,9,21,8,0,0) // Sat Oct 21 at 8pm
    }, {
        eventTypeName: "The Weeknd",
        venueName: "Barclays Center",
        date: new Date(2015,10,16,19,30,0) // Mon Nov 16 at 7:30pm
    }, {
        eventTypeName: "The Weeknd",
        venueName: "Barclays Center",
        date: new Date(2015,10,18,19,30,0) // Wed Nov 18 at 7:30pm
    }, {
        eventTypeName: "The Weeknd",
        venueName: "Barclays Center",
        date: new Date(2015,10,19,19,30,0) // Thurs Nov 19 at 7:30pm
    }, {
        eventTypeName: 'Chicago White Sox at New York Yankees',
        venueName: 'Yankee Stadium',
        date: new Date(2015,8,24,19,5,0)
    }, {
        eventTypeName: 'Chicago White Sox at New York Yankees',
        venueName: 'Yankee Stadium',
        date: new Date(2015,8,25,19,5,0)
    }, {
        eventTypeName: 'Chicago White Sox at New York Yankees',
        venueName: 'Yankee Stadium',
        date: new Date(2015,8,26,16,5,0)
    }, {
        eventTypeName: 'Chicago White Sox at New York Yankees',
        venueName: 'Yankee Stadium',
        date: new Date(2015,8,27,13,5,0)
    }, {
        eventTypeName: 'New Jersey Devils at New York Rangers Preseason',
        venueName: 'Madison Square Garden',
        date: new Date(2015,8,21,19,0,0)
    }, {
        eventTypeName: 'Philadelphia Flyers at New York Rangers Preseason',
        venueName: 'Madison Square Garden',
        date: new Date(2015,8,28,19,0,0)
    }, {
        eventTypeName: 'Boston Bruins at New York Rangers Preseason',
        venueName: 'Madison Square Garden',
        date: new Date(2015,8,30,19,0,0)
    // }, {
    //     eventTypeName: '',
    //     venueName: 'Madison Square Garden',
    //     date: new Date(2015,8,21,19,0,0)
    }];

  return Venue.find({}).select('name _id')
    .then(function(venues) {
      venues.forEach(
        function(venue) {
          venueDict[venue.name] = venue._id;
        });
      return EventType.find({}).select('name _id').exec();
    })
    .then(function(eventTypes) {
      eventTypes.forEach(function(eventType) {
        eventTypeDict[eventType.name] = eventType._id;
      });
    })
    .then(function() {
      events.forEach(function(e) {
        e.Venue = venueDict[e.venueName];
        e.EventType = eventTypeDict[e.eventTypeName];
        delete e.venueName;
        delete e.eventTypeName;
      });
    })
    .then(function() {
      return Event.createAsync(events);
    })
    .then(function(created) {
      createdEvents = created;
    });
};

var seedTickets = function(users, events) {
  var eventDict = {};
  var userDict = {};

  var tickets = [{
    eventProduct: 'BSB',
    seller: 'obama@gmail.com',
    buyer: 'chsea@fsa.com',
    dateSelling: new Date(2014, 4, 26, 20, 0, 0),
    dateSold: new Date(2014, 5, 26, 20, 0, 0),
    price: '1000'
  }, {
    eventProduct: 'BSB',
    buyer: 'obama@gmail.com',
    seller: 'chsea@fsa.com',
    dateSelling: new Date(2014, 4, 26, 20, 0, 0),
    dateSold: new Date(2014, 5, 26, 20, 0, 0),
    price: '1000'
  }, {
    eventProduct: 'BSB',
    seller: 'obama@gmail.com',
    price: '1000',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Hamilton',
    seller: 'obama@gmail.com',
    price: '1000',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Hamilton',
    seller: 'obama@gmail.com',
    price: '1000',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Hamilton',
    seller: 'chsea@fsa.com',
    buyer: 'obama@gmail.com',
    price: '700',
    dateSelling: new Date(2014, 8, 26, 20, 0, 0),
    dateSold: new Date(2014, 9, 26, 20, 0, 0)
  }, {
    eventProduct: 'Hamilton',
    seller: 'chsea@fsa.com',
    price: '500',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Hamilton',
    seller: 'danielp@fsa.com',
    price: '500',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Hamilton',
    seller: 'danielp@fsa.com',
    price: '1000',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Stromae and Janelle Monae',
    seller: 'danielp@fsa.com',
    price: '75',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Stromae and Janelle Monae',
    seller: 'danielp@fsa.com',
    price: '75',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'obama@gmail.com',
    price: '40',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'obama@gmail.com',
    price: '40',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'obama@gmail.com',
    price: '40',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'obama@gmail.com',
    price: '40',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'cristina@fsa.com',
    price: '50',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'obama@gmail.com',
    price: '50',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'cristina@fsa.com',
    price: '50',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'cristina@fsa.com',
    price: '75',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'chsea@fsa.com',
    price: '75',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'chsea@fsa.com',
    price: '75',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'chsea@fsa.com',
    price: '75',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }, {
    eventProduct: 'Washington Nationals at New York Mets',
    seller: 'chsea@fsa.com',
    price: '50',
    dateSelling: new Date(2015, 8, 26, 20, 0, 0)
  }];

  var eventIds = {};
  var eventDate = {};
  return Event.find().populate('EventType').then(function(events) {
    events.forEach(function(curEvent) {
      eventIds[curEvent.EventType.name] = curEvent._id;
      eventDate[curEvent._id] = curEvent.date;
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
    for (var i = 0; i < 100; i++) {
      var ticket = {
        eventProduct: events[Math.floor(Math.random() * events.length)]._id,
        seller: users[Math.floor(Math.random() * users.length)]._id,
        buyer: users[Math.floor(Math.random() * users.length)]._id,
        price: Math.floor(Math.random() * 2000).toFixed(2),
      };
      var date = new Date(eventDate[ticket.eventProduct]);
      date.setMonth(date.getMonth() - 2);
      ticket.dateSelling = date;
      date.setMonth(date.getMonth() + 1);
      ticket.dateSold = date;
      tickets.push(ticket);
    }
    for (var j =0; j < 300; j++) {
      var ticket2 = {
        eventProduct: events[Math.floor(Math.random() * events.length)]._id,
        seller: users[Math.floor(Math.random() * users.length)]._id,
        price: Math.floor(Math.random() * 2000).toFixed(2),
      };
      var date2 = new Date(eventDate[ticket2.eventProduct]);
      date2.setMonth(date2.getMonth() - 6);
      ticket2.dateSelling = date2;
      tickets.push(ticket2);
    }
    return Ticket.createAsync(tickets);
  });
};

var seedReviews = function(users, events) {
  var comments = ['ok', 'Meh.', 'Awesome!', 'terrible', "Well, It's not the Backstreet Boys."];
  var reviews = [];
  for (var i = 0; i < 100; i++) {
    var review = {
      eventType: events[Math.floor(Math.random() * events.length)],
      reviewer: users[Math.floor(Math.random() * users.length)],
      stars: Math.floor((Math.random() * 5) + 1),
      comment: comments[Math.floor(Math.random() * comments.length)]
    };
    reviews.push(review);
  }

  return Review.createAsync(reviews);
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
    var users;
        User.remove({})
        .then(function(){return Event.remove({}); })
        .then(function(){return EventType.remove({}); })
        .then(function(){return Venue.remove({}); })
        .then(function(){return Ticket.remove({}); })
        .then(function(){return Review.remove({}); })
        .then(function(){return seedUsers();})
        .then(function(){
          return seedAuthUsers();
        })
        .then(function(seededUsers){
          users = seededUsers;
          return seedVenues(); })
        .then(function () {
            return seedEventTypes();
        })
        .then(function(seededEvents) {
          return seedReviews(users, seededEvents);
        })
        .then(function(){
          return seedEvents();
        })
        .then(function(events){
          return seedTickets(users, createdEvents);
        })
        .then(function(tickets) {
          console.log(chalk.green('Seeding was successful!'));
          process.kill(0);
        })
        .catch(function(err) {
            console.error(err);
            process.kill(0);
        });
});
