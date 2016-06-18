'use strict';

const express = require('express');

const Todo = require('../model/todo');

const router = express.Router();


router.get('/', (req, res) => {
  console.log('GET handler for /todo route.');
	Todo.find().exec((err, todo) => {
		if (err) {
		  return res.send(err);
    }
		return res.json(todo);
  });
});

router.post('/', (req, res) => {
	console.log('POST handler for /todo route.');
	Todo.create(req.body, (err, todo) => {
		if (err) {
		  return res.send(err);
    }
		return res.json(todo);
	});
});

module.exports = router;
