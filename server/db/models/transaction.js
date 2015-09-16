'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	buyer: {
		type: String,
		ref: 'User',
		required: true
	},
	seller: {
		type: String,
		ref: 'User',
		required: true
	},
	tickets: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ticket',
		required: true
	}],
	date: {
		type: Date,
		default: Date.now,
		required: true
	}
});

schema.path('tickets').validate(function (tickets) {
	return tickets && tickets.length > 0;
}, "You need to specify tickets.");

mongoose.model('Transaction', schema);
