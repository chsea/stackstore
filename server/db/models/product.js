'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    category: {type: String, required: true, default: 'Other'},
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
});

schema.statics.findAndUpdate = function (oldEvent, changes) {
	Object.keys(changes).forEach(function(key){
		oldEvent[key] = changes[key];
	});
	return oldEvent.save();
};

mongoose.model('eventProduct', schema);

var Ticket = require('./ticket.js');

schema.methods.inventory = function () {
    Ticket.count({"eventProduct": this._id, sold:"false"}).then(function(count){return count; });
};

schema.methods.ticketsSold = function () {
    Ticket.count({"eventProduct": this._id, sold:"true"}).then(function(count){return count; });
};

