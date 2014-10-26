var TwitterStrategy = require('passport-twitter').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://157.140.126.24:4000/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        process.nextTick(function () {
          return done(null, profile);
        });
      }
    ));

}