'use strict';
var mongoose = require('mongoose');
var Ticket = require('./ticket');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    category: {type: String, required: true, default: 'Other'},
    venue: { type: Schema.Types.ObjectId, ref: 'Venue'},
});

schema.methods.inventory = function () {
    Ticket.count({"eventProduct": this._id, sold:"false"}).then(function(count){return count;});
};

schema.methods.ticketsSold = function () {
    Ticket.count({"eventProduct": this._id, sold:"true"}).then(function(count){return count;});
};

module.exports = mongoose.model('eventProduct', schema);