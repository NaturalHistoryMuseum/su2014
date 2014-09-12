
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transcriptionSchema = new Schema({
    identifier: String,
    scientificName: String,
    location: String,
    typeStatus: String,
    collector: String,
    collectionDate: String,
    created: Date
});

var specimensSchema = new Schema({
    _id: String,
    url: String,
    transcriptions: [transcriptionSchema]
})

mongoose.model('specimens', specimensSchema)