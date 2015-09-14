'use strict';
var mongoose = require('mongoose');
var Ticket = mongoose.model('Ticket');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    category: {type: String, required: true, default: 'Other'},
    venue: { type: Schema.Types.ObjectId, ref: 'Venue'},
});

schema.statics.findAndUpdate = function (oldEvent, changes) {
	Object.keys(changes).forEach(function(key){
		oldEvent[key] = changes[key];
	});
	return oldEvent.save();
};

schema.methods.inventory = function () {
    Ticket.count({"eventProduct": this._id, sold:"false"}).then(function(count){return count;});
};

schema.methods.ticketsSold = function () {
    Ticket.count({"eventProduct": this._id, sold:"true"}).then(function(count){return count;});
};

mongoose.model('eventProduct', schema);