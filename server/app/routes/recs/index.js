var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var EventType = mongoose.model('EventType');
var Ticket = mongoose.model('Ticket');
var _ = require('lodash');
var Promise = require('bluebird');

router.param('eventId',function(req,res,next,eventId){
	Event.findOne({_id: eventId}).populate('EventType').then(
		function(e){
			req.currEventTypeId = e.EventType._id.toString();
			req.tags = e.EventType.tags;
			next();
		},
		function (err) {
			err.status = 404;
			next(err);
		}
	);
});

router.get('/',function(req,res){
	EventType.find().then( results => res.send(results) );
});

router.get('/cart',function(req,res,next){
	var tags = [];
	var eventTypesInCart = [];

	//populate the cart
	Ticket.find({_id: { $in: req.session.cart}})
	.deepPopulate("eventProduct.EventType")
	.then(function(tickets){
		//create array of all tags in cart
		tickets.forEach(function(ticket){
			//ignore duplicate event types
			if(eventTypesInCart.indexOf(ticket.eventProduct.EventType._id.toString()) > -1){
				return;
			}
			eventTypesInCart.push(ticket.eventProduct.EventType._id.toString());

			//make that mama array
			tags = tags.concat(ticket.eventProduct.EventType.tags);
		});
		//evaluate top 3 closest related event types
		EventType.find()
		.then(function (results) {
			// transform instances from mongoose documents to ordinary objects 
			// and remove event types already in cart
			results = results.map(result => result.toObject())
				.filter(r => eventTypesInCart.indexOf(r._id.toString()) === -1);
			
			// attach a score to each event type
			results.forEach(function (r) {
				r.score = tags.filter( tag => r.tags.indexOf(tag) > -1 ).length;
			});
			
			// sort by score and take top three
			var recEventTypes = _.sortByOrder(results, 'score', 'desc').slice(0,3);
			
			// find one actual Event that corresponds to each event type
			return Promise.map(recEventTypes, function (elem) { 
				return Event.findOne({"EventType":elem._id}).populate('EventType'); 
			});
		})
		.then( events => res.json(events) )
		.then(null, next);
	});
});

router.get('/:eventId',function (req,res,next) {
	EventType.find({tags: {$in: req.tags} })
		.then(function (results) {
			// transform instances to objects and remove the current event type from the list
			results = results.map(result => result.toObject()).filter(r => r._id!=req.currEventTypeId);
			
			// attach a score to each event type
			results.forEach(function (r) {
				r.score = req.tags.filter( tag => r.tags.indexOf(tag) > -1 ).length;
			});
			
			// sort by score, take top three, and keep just their _ids
			var finalArr = _.sortByOrder(results, 'score', 'desc').slice(0,3).map(r => r._id);
			
			// find one actual Event that corresponds to each event type
			return Promise.map(finalArr, function (elem) { 
				return Event.findOne({"EventType":elem}).populate('EventType'); 
			});
		})
		.then( events => res.json(events) )
		.then(null, next);
});

module.exports = router;