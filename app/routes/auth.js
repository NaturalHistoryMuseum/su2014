
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, passport) {

    app.get('/auth', passport.authenticate('twitter'),
      function(req, res){
        // The request will be redirected to Twitter for authentication, so this
        // function will not be called.
      });

    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', { failureRedirect: '/' }),
      function(req, res) {
        res.cookie('su2014-key', bcrypt.hashSync(req.user.username, bcrypt.genSaltSync(8), null));
        res.redirect('/');
      });

    app.get('/logout', function(req, res){
      req.logout();
      res.clearCookie('su2014-key');
      res.redirect('/');
    });

}
