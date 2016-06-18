module.exports = function(express) {
  'use strict';
  const bodyParser=require('body-parser');
  const cookieParser=require('cookie-parser');
	var express = express || require('express');
	const app = express();
	app.set('views', __dirname+'/../views');
	app.set('view engine', 'ejs');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static(__dirname+'/../public'));
	app.set('port', process.env.PORT || 8080);
  return app;
}
