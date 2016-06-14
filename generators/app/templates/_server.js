var express = require('express'),
	todo    = require('./routes/todo');
var app = require("./config/express")(express);

app.get("/",function(req, res) {
	res.render("index");
})
app.use('/todo',  todo);
app.listen(app.get('port'), function() {
  console.log('App listening at port ' + app.get('port'));
});