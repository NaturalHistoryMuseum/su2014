var mongoose = require('mongoose');

module.exports = function (app) {

    // Get one specimen
    app.get('/api/specimen', function (req, res) {

        // TODO: Order by transcription count and skip count
        // FIXME: This potentially could mean skipping some specimens. Get minimum count? Mean you'll be stuck on records? Weight rand to lower regions? Pointless?
        console.log('Loading specimen image')

        // Get 20 specimens with the lowest number of transcriptions

        mongoose.model('specimens').find({}, null, {limit: 40, sort: {'name': 1}}, function (err, specimens) {

            // We want to return a random specimen from the 40 returned
            // So we hopefully won't have multiple people working on the same one at the same time
            var rand = Math.floor(Math.random() * specimens.length)

            if (!(rand in specimens)) {
                rand = 0
            }

            console.log('Returning specimen ' + specimens[rand])

            if (err)
                res.send(err)

            res.json(specimens[rand]);

        });

    });

    // Update the specimen with the transcription
    app.post('/api/specimen', function (req, res) {

        var transcriptionData = req.body

        transcriptionData['created'] = new Date();

        mongoose.model('specimens').update({'_id': req.body.specimen._id}, { $push: {transcriptions: transcriptionData}}, function (err, data) {
            if (err)
                console.log('Error saving transcription' + err);
        });

        // And save to portal
        var ckan_keys = require('../../config/ckan');
        var request = require("request");

        transcriptionData['flickr_id'] = 'flickr:' + req.body.specimen._id
        transcriptionData['image_url'] = req.body.specimen.url
        console.log(transcriptionData);

        // Delete the specimen part of the body
        delete transcriptionData.specimen;

        // Create object to save to the datastore
        var datastore_dict = {
            resource_id: ckan_keys.resourceID,
            records: [transcriptionData]
        }

        var headers = {
            'Authorization': ckan_keys.apiKey
        }

        request({
            url: ckan_keys.url + '/api/3/action/datastore_creates',
            method: "POST",
            json: datastore_dict,
            headers: headers
        }, function _callback(err, res, body) {
            var result = body;

            if (res.statusCode == 400) {
                console.log(body);
            }


        });

        console.log('Transcription saved')

    });

};