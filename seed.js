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
    }];

    return User.createAsync(users);

};

var seedVenues = function() {

    var venues = [{
        name: 'Madison Square Garden',
        streetAddress: '4 Pennsylvania Plaza',
        city: 'New York',
        state: 'NY',
        zip: 10001
    }, {
        name: 'Richard Rodgers Theatre',
        streetAddress: '226 West 46th Street',
        city: 'New York',
        state: 'NY',
        zip: 10036
    }, {
        name: 'Citi Field',
        streetAddress: '123-01 Roosevelt Ave',
        city: 'New York',
        state: 'NY',
        zip: 11368
    }, {
        name: 'Webster Hall',
        streetAddress: '125 East 11th St.',
        city: 'New York',
        state: 'NY',
        zip: 10003
    }];

    return Venue.createAsync(venues);

};

// var schema = new mongoose.Schema({
//     name: {type: String, required: true},
//     date: {type: Date, required: true},
//     category: {type: String, required: true, default: 'Other'},
//     venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
// });


var seedEvents = function() {
    var venueDict={};
    var events = [{
        name: 'Stromae and Janelle Monae',
        date: new Date(2015, 10, 1, 20, 0, 0),
        venueName: 'Madison Square Garden',
        category: 'Concert'
    }, {
        name: 'Hamilton',
        date: new Date(2015,9,26,20,0,0),
        venueName: 'Richard Rodgers Theatre',
        category: 'Theater'
    }, {
        name: 'Washington Nationals at New York Mets',
        date: new Date(2015,10,4,15,10,0),
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
        .then(function(){Event.createAsync(events); });
};

connectToDb.then(function() {
    User.findAsync({})
        .then(function(users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
        }})
        .then(function() {
            return console.log(chalk.green('User seed successful!'));
        })
        .then(function() {
            return Venue.findAsync({});
        })
        .then(function(venues) {
            if (venues.length === 0) {
                return seedVenues();
            } else {
                console.log(chalk.magenta('Seems to already be venue data, exiting!'));
            }
        })
        .then(function() {
            return Event.findAsync({});
        })
        .then(function(events){
            if (events.length===0) {
                return seedEvents();
            } else {
                console.log(chalk.magenta('Seems to already be event data, exiting!'));
                process.kill(0);
            }
        })
        .catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});
