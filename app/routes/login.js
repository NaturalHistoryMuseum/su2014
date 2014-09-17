module.exports = function (app, passport) {

    app.get('/login', passport.authenticate('twitter'),
      function(req, res){
        // The request will be redirected to Twitter for authentication, so this
        // function will not be called.
      });

    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', { failureRedirect: '/' }),
      function(req, res) {
        res.cookie('username', req.user.username);
        res.redirect('/');
      });

    app.get('/logout', function(req, res){
      req.logout();
      res.clearCookie('username');
      res.redirect('/');
    });

}
