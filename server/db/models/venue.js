'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
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
        }
    },
    category: {
        type: String,
        required: true,
        default: 'Other'
    }, // stadium vs. art gallery etc.
    seatingMapUrl: {
        type: String,
        default: '/images/pendingSeatMap.png'
    },
    imageUrl: {
        type: String,
        default: '/images/romanColiseum.jpg'
    },
    coordinates: [Number] // latitude and longitude
});

mongoose.model('Venue', schema);
