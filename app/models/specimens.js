
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transcriptionSchema = new Schema({
    scientificName: String,
    location: String,
    typeStatus: String
});

var specimensSchema = new Schema({
    _id: String,
    url: String,
    transcriptions: [transcriptionSchema]
})

mongoose.model('specimens', specimensSchema)