// load modules
var express = require('express'),
	handlebars = require('express3-handlebars'),
	fs = require('fs'),
	fbapi = require('./facebook'),
	engines = require('consolidate');

var port = process.env.PORT || 5001;
var app = express();

// configuration
app.configure(function(){
	app.use(express.logger());
	app.use(express.compress());
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(express.static(__dirname));
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));
	app.use(app.router);

	// handlebars config
	app.set('views', __dirname + '/views');
	app.set('view engine', 'handlebars');
   	app.set("view options", { layout: false });
   	app.engine('.handlebars', engines.handlebars);  //Set Extension here   
});

//routes
app.get('/', function(request, response) {

	var data = {title:"testing"};
  	response.render("index.handlebars", data);  //Use Extension here

	/*
		var indexContents = fs.readFile('index.html', function (err, data) {
			if (err) throw err;
			response.send(data.toString());
		});
	*/
});

app.get('/allphotos', function(request, response) {

	var imgSourceArray = fbapi.getAllPhotos(response);
	//response.send('allphotos');

	/*
		var indexContents = fs.readFile('index.html', function (err, data) {
			if (err) throw err;
			response.send(data.toString());
		});
	*/
});


app.listen(port, function() {
	console.log("Listening on " + port);
});



/* http://pastebin.com/GpSsbqXv

//Load Modules  
var express = require('express');
var handlebars = require('handlebars');
var engines = require('consolidate');

var app = express();

// Configuration
app.configure( function() {
	app.set('views', __dirname + '/template');
	app.set('view engine', 'handlebars');
   	app.set("view options", { layout: false });
   	app.engine('.handlebars', engines.handlebars);  //Set Extension here   
});

// Routes
app.get('/', function(req, res) {
  	var data = {title:"test"};
  	res.render("profilecard.handlebars", data);  //Use Extension here
});

app.listen(3000);

console.log("NodeJS Server Started");


*/