var bcrypt   = require('bcrypt-nodejs');

module.exports = function (app) {

    // Send a tweet
    app.post('/tweet', function (req, res) {

        if (bcrypt.compareSync('informaticians', req.cookies['su2014-key'])) {

            var data = req.body

            var keys = require('../../config/twitter-auth');

            var OAuth = require('oauth');

            var twitterOAuth = new OAuth.OAuth(
                "https://api.twitter.com/oauth/request_token",
                "https://api.twitter.com/oauth/access_token",
                keys.consumerKey,
                keys.consumerSecret,
                "1.0A",
                null,
                "HMAC-SHA1"
            );

            var status = '.' + data.username + ' has just transcribed @nhm_london specimen ' + data.flickrURL + ' #SU2014'

            var body = ({'status': status});

            twitterOAuth.post("https://api.twitter.com/1.1/statuses/update.json",
                keys.accessToken, keys.accessTokenSecret, body, "application/json",
                function (error, data, response2) {
                    if (error) {
                        console.log('Error: Something is wrong.\n' + JSON.stringify(error) + '\n');
                    } else {
                        console.log('Twitter status updated.\n');
                        console.log(response2 + '\n');
                    }
                });

        }else{
            console.log('ERROR: Cookie does not match')
        }

    });

};