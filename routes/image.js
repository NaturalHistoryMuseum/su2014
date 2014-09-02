
var mongoose = require('mongoose');

module.exports = function(app) {

    app.get('/api/image', function(req, res) {

        console.log('Retrieving images')

        mongoose.model('images').find(function(err, images){
            console.log(images);
            res.send(images);
        });

    });

};