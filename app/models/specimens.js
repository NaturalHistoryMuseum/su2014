
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var specimensSchema = new Schema({
    url: String,
    _id: String
})

mongoose.model('specimens', specimensSchema)