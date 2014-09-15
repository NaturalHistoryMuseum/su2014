module.exports = function (app) {

    // Send a tweet
    app.post('/tweet', function (req, res) {


        var data = req.body
        data.flickr = 'https://www.flickr.com/photos/nhm_beetle_id/13780476613/in/pool-2687808@N24'
        data.username = "@benjaminscott"

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

        var status = '.' + data.username + ' has just transcribed @nhm_london specimen ' + data.flickr + ' #su2014'
        var body = ({'status': status});

//        twitterOAuth.post("https://api.twitter.com/1.1/statuses/update.json",
//            keys.accessToken, keys.accessTokenSecret, body, "application/json",
//            function (error, data, response2) {
//                if (error) {
//                    console.log('Error: Something is wrong.\n' + JSON.stringify(error) + '\n');
//                } else {
//                    console.log('Twitter status updated.\n');
//                    console.log(response2 + '\n');
//                }
//            });

    });

};