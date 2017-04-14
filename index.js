var path = require('path');
var express = require('express');
var config = require('config-lite');
var routes = require('./routes');
var session = require('express-session');
var Mongostore = require('connect-mongo')(session);

var app = express();

app.set('views',path.join(__dirname + '/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(session,function(){
	name: config.session.key,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: config.session.maxAge
	},
	store: new Mongostore({
		url: config.session.mongodb
	})
});

app.use(function(req,res,next){
	locals.req.user = req.session.user;
});

routes(app);

app.listen(config.port,function(){
	console.log(`app listening on ${config.port}`);
});