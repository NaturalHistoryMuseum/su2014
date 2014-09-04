
var mongoose = require('mongoose');

module.exports = function(app) {

    // Load a random specimen

    function load_random_specimen(req, res){

        // TODO: Order by transcription count and skip count
        console.log('Loading specimen image')

        // Get 20 specimens with the lowest number of transcriptions

        mongoose.model('specimens').find({}, null, {limit: 40, sort: {'name': 1}}, function(err, specimens){

            // We want to return a random specimen from the 20 returned
            // So we hopefully won't have multiple people working on the same one at the same time
            var rand = Math.floor(Math.random() * specimens.length)

            if (!(rand in specimens)){
                rand = 0
            }

            console.log('Sending specimen ' + specimens[rand])

            if (err)
                res.send(err)

            res.json(specimens[rand]);

        });

    }

    app.get('/api/specimen', load_random_specimen);

    app.post('/api/specimen', function(req, res) {
        console.log('Saving specimen transcription')

        // And load another specimen
        load_random_specimen(req, res);

    });

    // Add update

};