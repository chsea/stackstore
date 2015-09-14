'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	date: {
		type: { type: Date, default: Date.now }, 
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
});