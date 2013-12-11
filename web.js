var express = require('express'),
	fs = require('fs'),
	//fbapi = require('./facebook'),
	port = process.env.PORT || 5000;

var app = express();
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
});

app.get('/', function(request, response) {
	var indexContents = fs.readFile('index.html', function (err, data) {
		if (err) throw err;
		response.send(data.toString());
	});
});

app.get('/allphotos', function(request, response) {

	//fbapi.getAllPhotos();



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