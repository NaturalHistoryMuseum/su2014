	// set up ========================
	var express  = require('express');
    var fs       = require('fs');
	var app      = express();
	var mongoose = require('mongoose');
    var passport = require('passport');

    var morgan = require('morgan');
	var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var cookieParser = require('cookie-parser');
    var session      = require('express-session')

	// configuration =================

	var port = process.env.PORT || 8080; // set our port

    // connect to our mongoDB database
    mongoose.connect(process.env.MONGO_URL);

    // Models =================
    require('./app/models/specimens')

    // get all data/stuff of the body (POST) parameters
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    app.use(cookieParser());
    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

    // required for passport
    app.use(session({ secret: 'science-uncovered' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

//    require('./config/passport')(passport);

    // routes ==================================================
    require('./app/routes/specimens')(app);
    require('./app/routes/twitter')(app);
    require('./app/routes/auth')(app, passport);
    require('./app/routes/index')(app);

    // start app ===============================================
    app.listen(port);										// startup our app at http://localhost:8080
    console.log('Serving on port ' + port); 			// shoutout to the user
    exports = module.exports = app;