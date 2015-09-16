'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
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
    }
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
