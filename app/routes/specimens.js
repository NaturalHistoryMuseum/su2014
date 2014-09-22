
var mongoose = require('mongoose');

module.exports = function(app) {

    // Get one specimen
    app.get('/api/specimen', function(req, res){

        // TODO: Order by transcription count and skip count
        // FIXME: This potentially could mean skipping some specimens. Get minimum count? Mean you'll be stuck on records? Weight rand to lower regions? Pointless?
        console.log('Loading specimen image')

        // Get 20 specimens with the lowest number of transcriptions

        mongoose.model('specimens').find({}, null, {limit: 40, sort: {'name': 1}}, function(err, specimens){

            // We want to return a random specimen from the 40 returned
            // So we hopefully won't have multiple people working on the same one at the same time
            var rand = Math.floor(Math.random() * specimens.length)

            if (!(rand in specimens)){
                rand = 0
            }

            console.log('Returning specimen ' + specimens[rand])

            if (err)
                res.send(err)

            res.json(specimens[rand]);

        });

    });

    // Update the specimen with the transcription
    app.post('/api/specimen', function(req, res) {

        var transcriptionData = req.body
        transcriptionData['created'] = Date.now();

        mongoose.model('specimens').update({'_id': req.body._id}, { $push : {transcriptions: transcriptionData}}, function(err, data){
            if (err)
                console.log('Error saving transcription' + err);
        });

        console.log('Transcription saved')

    });

};