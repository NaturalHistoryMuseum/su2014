	// set up ========================
	var express  = require('express');
    var fs       = require('fs');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb
	var morgan = require('morgan'); 			// log requests to the console (express4)
	var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
	var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

	// configuration =================

    var db = require('./config/db');

	var port = process.env.PORT || 8080; // set our port

    mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

    // Models =================
    require('./app/models/specimens')

    // get all data/stuff of the body (POST) parameters
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

    // routes ==================================================
    require('./app/routes/specimens')(app);
    require('./app/routes/index')(app);

    // start app ===============================================
    app.listen(port);										// startup our app at http://localhost:8080
    console.log('Serving on port ' + port); 			// shoutout to the user
    exports = module.exports = app;