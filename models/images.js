
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imagesSchema = new Schema({
    url: String
})

mongoose.model('images', imagesSchema)