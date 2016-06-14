module.exports = function(express) {
	var express = express || require("express");
	var app = express();
	app.set('views', path.join(__dirname, '/../views'));
	app.set('view engine', 'ejs');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '/../public')));
	app.set('port', process.env.PORT || 8080);
}