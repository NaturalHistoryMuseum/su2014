
var mongoose = require('mongoose');

module.exports = function(app) {

    // On home page, we need a random image

    app.get('/api/image', function(req, res) {

        // Get minimum transcription count

        console.log('Retrieving specimen image')

        mongoose.model('images').findOne({}, null, {sort: {'name': 1}}, function(err, images){
            console.log(images);
            res.send(images);
        });

    });

    // Add update

};