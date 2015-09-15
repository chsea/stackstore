var router = require('express').Router();
var User = require('mongoose').model('User');

router.param('id', function(req, res, next, id){
	User.findById(id).then(function(user){
		req.user = user;
		next();
	}).then(null, next);
});

router.get('/', function(req, res, next){
	User.find(req.query).then(function(users){
		res.json(users);
	}).then(next);
});

router.post('/', function(req, res, next){
	User.create(req.body).then(function(createdUser){
		res.send(createdUser);
	}).then(null, next);
});

router.put('/:id', function(req, res, next){
	for(var i in req.body){
		req.user[i] = req.body[i];
	}
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