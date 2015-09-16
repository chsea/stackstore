'use strict';
var mongoose = require('mongoose');
var Ticket = mongoose.model('Ticket');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
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

schema.post('save', function(doc) {
	var tickets = [];
	doc.tickets.forEach(function(ticket) {
		tickets.push(Ticket.findAndUpdate(ticket, {sold: true, buyer: doc.buyer}));
	});
	Promise.all(tickets).then(function(tickets) {
		console.log(tickets.length + ' saved');
	});
});

mongoose.model('Transaction', schema);
