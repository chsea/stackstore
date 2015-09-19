var router = require('express').Router();
var AuthUser = require('mongoose').model('AuthUser');
var _ = require('lodash');

router.param('id', function(req, res, next, id){
	AuthUser.findById(id).then(function(user){
		req.user = user;
		next();
	}).then(null, next);
});

router.get('/', function(req, res, next){
	req.query.type = 'AuthUser';
	AuthUser.find(req.query).then(function(users){
		res.json(users);
	}).then(next);
});

router.get('/:id', function(req, res){
	res.json(req.user);
});

router.post('/', function(req, res, next){
	AuthUser.create(req.body).then(function(createdUser){
		res.status(201).json(createdUser);
	}).then(null, next);
});

router.put('/:id', function(req, res, next){
	_.merge(req.user, req.body);
	req.user.save().then(function(updatedUser){
		res.send(updatedUser);
	}).then(null, next);
});

router.delete('/:id', function(req, res, next){
	req.user.remove().then(function(deletedUser){
		res.send(deletedUser);
	}).then(null, next);
});

module.exports = router;
