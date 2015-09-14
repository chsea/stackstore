'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    eventProduct: { type: Schema.Types.ObjectId, ref: 'eventProduct', required: true},
    seller: {type: Schema.Types.ObjectId, ref:'User', required: true},
    price: {type: Number, required: true}, //min $0.01
    seat: {type: String, required: true, default: 'General Admission'},
    sold: {type: Boolean, required: true, default: false} // if sold, obvs not avail anymore
});

module.exports = mongoose.model('Ticket', schema);