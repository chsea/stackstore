'use strict';
var mongoose = require('mongoose');
//User = mongoose.model('User');

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
	ticket: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ticket',
		required: true
	},
	date: {
		type: Date, 
		default: Date.now, 
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
});

mongoose.model('Transaction', schema);