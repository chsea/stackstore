'use strict';
var mongoose = require('mongoose');
var shortid = require('shortid');

var schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: 'Other'
    }, // stadium vs. art gallery etc.
    seatingMapUrl: {
        type: String
    },
    coordinates: [Number] // latitude and longitude
});

schema.statics.findAndUpdate = function(id, changes) {
    return this.findById(id).then(function(found) {
        Object.keys(changes).forEach(function(key) {
            found[key] = changes[key];
        });
        return found.save();
    });
};

mongoose.model('Venue', schema);
