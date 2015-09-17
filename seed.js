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
var Venue = Promise.promisifyAll(mongoose.model('Venue'));
var Event = Promise.promisifyAll(mongoose.model('EventProduct'));
var Ticket = Promise.promisifyAll(mongoose.model('Ticket'));
var Transaction = Promise.promisifyAll(mongoose.model('Transaction'));

var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password',
        firstName: 'Tim',
        lastName: 'Othy'
    }, {
        email: 'obama@gmail.com',
        password: 'potus',
        firstName: 'John',
        lastName: 'Smith'
    }, {
        email: 'cristina@fsa.com',
        password: 'millenium',
        firstName: 'Cristina',
        lastName: 'Colón'
    }, {
        email: 'chsea@fsa.com',
        password: 'bsbforlife',
        firstName: 'Chel',
        lastName: 'Du'
    }, {
        email: 'danielp@fsa.com',
        password: 'millenium',
        firstName: 'Daniel',
        lastName: 'Perelly'
    }, {
        email: 'danielm@fsa.com',
        password: 'millenium',
        firstName: 'Daniel',
        lastName: 'Moenich'
    }];

    return User.createAsync(users);

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

var createdEvents;
var seedEvents = function() {
    var venueDict={};
    var events = [{
        name: 'Stromae and Janelle Monae', 
        imgUrl: '/images/stromae.jpeg', 
        date: new Date(2015, 10, 1, 20, 0, 0),
        venueName: 'Madison Square Garden',
        category: 'Concert'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg', 
        date: new Date(2015,9,24,19,0,0), // thurs 9/24 @ 7pm
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg', 
        date: new Date(2015,9,25,20,0,0), // fri 9/25 @ 8pm
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg', 
        date: new Date(2015,9,26,14,0,0), // sat 9/26 @ 2pm
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg', 
        date: new Date(2015,9,26,20,0,0), // sat 9/26 @ 8pm
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg', 
        date: new Date(2015,9,27,15,0,0), // sun 9/27 @ 3pm
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton',
        imgUrl: '/images/hamilton.jpg', 
        date: new Date(2015,9,29,19,0,0), // tues 9/29 @ 7pm
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Hamilton', 
        imgUrl: '/images/hamilton.jpg', 
        date: new Date(2015,9,30,14,0,0), // wed 9/30 @ 2pm
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Washington Nationals at New York Mets',
        imgUrl: '/images/natsVsMets.jpg', 
        date: new Date(2015,10,2,19,10,0), // fri oct 2 @ 7:10pm
        venueName: 'Citi Field',
        category: 'Sports'
    }, {
        name: 'Washington Nationals at New York Mets',
        imgUrl: '/images/natsVsMets.jpg', 
        date: new Date(2015,10,3,19,10,0), // sat oct 3 @ 7:10pm
        venueName: 'Citi Field',
        category: 'Sports'
    }, {
        name: 'Washington Nationals at New York Mets',
        imgUrl: '/images/natsVsMets.jpg', 
        date: new Date(2015,10,4,15,10,0), // sun oct 4 @ 3:10pm
        venueName: 'Citi Field',
        category: 'Sports'
    }, {
        name: 'Rudimental',
        date: new Date(2015,9,29,19,0,0),
        venueName: 'Webster Hall',
        category: 'Concert'
    }];

    return Venue.find({}).select('name _id')
        .then(function(venues){
            venues.forEach(
                function(venue){venueDict[venue.name]=venue._id;
            });
        })
        .then(function(){
            events.forEach(function(e){
                e.venue = venueDict[e.venueName];
                delete e.venueName;
            });
        })
        .then(function(){return Event.createAsync(events); })
        .then(function(created){createdEvents=created; });
};

var createdTickets;
var seedTickets = function() {
    var eventDict={};
    var userDict={};

    var tickets = [{
        eventName: 'Hamilton',
        sellerEmail: 'obama@gmail.com',
        date: new Date(2015,9,26,14,0,0), // sat 9/26 @ 2pm
        price: '1000'
    }, {
        eventName: 'Hamilton',
        sellerEmail: 'obama@gmail.com',
        date: new Date(2015,9,26,14,0,0), // sat 9/26 @ 2pm
        price: '1000'
    }, {
        eventName: 'Hamilton',
        sellerEmail: 'chsea@fsa.com',
        date: new Date(2015,9,27,15,0,0), // sun 9/27 @ 3pm
        price: '700'
    }, {
        eventName: 'Hamilton',
        sellerEmail: 'chsea@fsa.com',
        date: new Date(2015,9,27,15,0,0), // sun 9/27 @ 3pm
        price: '500'
    }, {
        eventName: 'Hamilton',
        date: new Date(2015,9,29,19,0,0), // tues 9/29 @ 7pm
        sellerEmail: 'danielp@fsa.com',
        price: '500'
    }, {
        eventName: 'Hamilton',
        date: new Date(2015,9,29,19,0,0), // tues 9/29 @ 7pm
        sellerEmail: 'danielp@fsa.com',
        price: '1000'
    }, {
        eventName: 'Stromae and Janelle Monae',
        date: new Date(2015, 10, 1, 20, 0, 0),
        sellerEmail: 'danielm@fsa.com',
        price: '75'
    }, {
        eventName: 'Stromae and Janelle Monae',
        date: new Date(2015, 10, 1, 20, 0, 0),
        sellerEmail: 'danielm@fsa.com',
        price: '75'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,2,19,10,0), // fri oct 2 @ 7:10pm
        sellerEmail: 'obama@gmail.com',
        price: '40'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,2,19,10,0), // fri oct 2 @ 7:10pm
        sellerEmail: 'obama@gmail.com',
        price: '40'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,2,19,10,0), // fri oct 2 @ 7:10pm
        sellerEmail: 'obama@gmail.com',
        price: '40'
    },{
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,2,19,10,0), // fri oct 2 @ 7:10pm
        sellerEmail: 'obama@gmail.com',
        price: '40'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,3,19,10,0), // sat oct 3 @ 7:10pm
        sellerEmail: 'cristina@fsa.com',
        price: '50'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,3,19,10,0), // sat oct 3 @ 7:10pm
        sellerEmail: 'obama@gmail.com',
        price: '50'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,3,19,10,0), // sat oct 3 @ 7:10pm
        sellerEmail: 'cristina@fsa.com',
        price: '50'
    },{
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,3,19,10,0), // sat oct 3 @ 7:10pm
        sellerEmail: 'cristina@fsa.com',
        price: '75'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,4,15,10,0), // sun oct 4 @ 3:10pm
        sellerEmail: 'chsea@fsa.com',
        price: '75'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,4,15,10,0), // sun oct 4 @ 3:10pm
        sellerEmail: 'chsea@fsa.com',
        price: '75'
    }, {
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,4,15,10,0), // sun oct 4 @ 3:10pm
        sellerEmail: 'chsea@fsa.com',
        price: '75'
    },{
        eventName: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,4,15,10,0), // sun oct 4 @ 3:10pm
        sellerEmail: 'chsea@fsa.com',
        price: '50'
    }, {
        eventName: 'Rudimental',
        date: new Date(2015,9,29,19,0,0),
        sellerEmail: 'testing@fsa.com',
        price: '25'
    }, {
        eventName: 'Rudimental',
        date: new Date(2015,9,29,19,0,0),
        sellerEmail: 'testing@fsa.com',
        price: '25'
    }
    ];

    return Event.find({}).select('name date _id')
        .then(function(events){
            return events.forEach(
                function(e){
                    var key = e.name+e.date.toISOString();
                    eventDict[key]=e._id;
            });
        })
        .then(function(){return User.find();})
        .then(function(users){
            return users.forEach(
                    function(user){userDict[user.email]=user._id;
                });
        })
        .then(function(){
            tickets.forEach(function(ticket){
                var key = ticket.eventName+ticket.date.toISOString();
                ticket.eventProduct = eventDict[key];
                ticket.seller = userDict[ticket.sellerEmail];
                delete ticket.eventName;
                delete ticket.sellerEmail;
            });
        })
        .then(function(){ 
            return Ticket.createAsync(tickets); 
        })
        .then(function(created){createdTickets=created; });
};

var seedTransactions = function() {
    var userDict={};

    var transactions = [{
        buyerEmail: 'testing@fsa.com',
        sellerEmail: 'obama@gmail.com',
        tickets: []
    }, {
        buyerEmail: 'cristina@fsa.com',
        sellerEmail: 'chsea@fsa.com',
        tickets: []
    }, {
        buyerEmail: 'chsea@fsa.com',
        sellerEmail: 'danielm@fsa.com',
        tickets: []
    }, {
        buyerEmail: 'danielm@fsa.com',
        sellerEmail: 'danielp@fsa.com',
        tickets: []
    }, {
        buyerEmail: 'danielp@fsa.com',
        sellerEmail: 'cristina@fsa.com',
        tickets: []
    }, {
        buyerEmail: 'cristina@fsa.com',
        sellerEmail: 'danielm@fsa.com',
        tickets: []
    }, {
        buyerEmail: 'danielm@fsa.com',
        sellerEmail: 'obama@gmail.com',
        tickets: []
    }, {
        buyerEmail: 'danielp@fsa.com',
        sellerEmail: 'testing@fsa.com',
        tickets: []
    }, {
        buyerEmail: 'obama@gmail.com',
        sellerEmail: 'chsea@fsa.com',
        tickets: []
    }, {
        buyerEmail: 'chsea@fsa.com',
        sellerEmail: 'testing@fsa.com',
        tickets: []
    }
    ];

    for (var i=0; i<createdTickets.length;i++) {
        var nextTicket = createdTickets.shift();
        transactions[i%transactions.length].tickets.push(nextTicket);
    }

    return User.find().select('email _id')
        .then(function(users){
            return users.forEach(function(user){
                userDict[user.email]=user._id;
            });
        })
        .then(function(){
            return transactions.forEach(function(t){
                t.seller = userDict[t.sellerEmail];
                t.buyer = userDict[t.buyerEmail];
                delete t.sellerEmail;
                delete t.buyerEmail;
            });
        })
        .then(function(){return Transaction.createAsync(transactions); });
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
        .then(function(){return Event.remove({}); })
        .then(function(){return Venue.remove({}); })
        .then(function(){return Ticket.remove({}); })
        .then(function(){return Transaction.remove({}); })
        .then(function(){return seedUsers(); })
        .then(function(venues){return seedVenues(); })
        .then(function(events){return seedEvents(); })
        .then(function(tickets){return seedTickets(); })
        .then(function(transactions){return seedTransactions(); })
        .then(function() {
            console.log(chalk.green('Seeding was successful!'));
            process.kill(0);
        })
        .catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});
