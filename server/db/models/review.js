'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    reviewer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    eventType: {type: mongoose.Schema.Types.ObjectId, ref: 'EventType', required: true},
    stars: {type: Number, required: true},
    review: String
});

mongoose.model('Review', schema);
