'use strict';
const express = require('express');
const	todo = require('./routes/todo');
const app = require('./config/express')(express);

app.get('/',(req, res) => {
	res.render('index');
})
app.use('/todo',  todo);
app.listen(app.get('port'),_ => {
  console.log(`App listening at port ${app.get('port')}`);
});
