var express = require('express');

var Todo = require('../model/todo');

var router = express.Router();


router.get('/', function(req, res) {
  	console.log('GET handler for /todo route.');
	Todo.find().exec(function(err, todo){
		if (err)
		  return res.send(err);
		return res.json(todo);
  	});
});

router.post('/', function(req, res) {
	console.log('POST handler for /todo route.');
	Todo.create(req.body, function(err, todo){
		if (err)
		  return res.send(err);
		return res.json(todo);
	});
});

module.exports = router;