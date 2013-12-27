/* https://npmjs.org/package/express3-handlebars*/

// load modules
var express = require('express'),
    exphbs  = require('express3-handlebars'),
    fbapi = require('./facebook'),
    app = express(),

   	port = process.env.PORT || 5000;

// configuration
app.use(express.static('bower_components/gumby'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
app.get('/', function (req, res) {
	fbapi.getAllPhotos(res);
	//var context = {"photos": "photos test"};
    //res.render('home',context);
});

// serve static content 
// - must be at bottom so routes and templates can be served first? (https://github.com/ericf/express3-handlebars/blob/master/examples/advanced/app.js)
// - don't forget trailing slash
app.use(express.static('static/'));
app.use(express.static('static/bower_components/gumby/'));
app.use(express.static('static/bower_components/gumby-parallax/'));
app.use(express.static('static/bower_components/gumby-inview/'));


app.listen(port, function() {
	console.log("Listening on " + port);
});

