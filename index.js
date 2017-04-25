var path = require('path');
var express = require('express');
var config = require('config-lite');
var routes = require('./routes');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

app.set('views',path.join(__dirname + '/views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(session({
	name: config.session.key,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: config.session.maxAge
	},
	store: new MongoStore({
		url: config.mongodb
	})
}));

app.use(function(req,res,next){
	res.locals.user = req.session.user;
	next();
});

routes(app);

app.listen(config.port,function(){
	console.log(`app listening on ${config.port}`);
});