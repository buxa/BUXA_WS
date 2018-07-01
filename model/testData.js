var mongoose = require('mongoose');
var schema = mongoose.Schema;
var testDataSchema = new schema({
    testDataID:{type: String, unique: true, required: true},
    sessionRelatedID:{type: String, required: true},
    screenCaptureURL: {type: String, required: true},
    subjectVideoURL: {type: String, required: true},
    subjectAudioURL: {type: String, required: true},
    subjectPulseURL: {type: String, required: true}
}, {collection: 'testsData'});

//validation with DB
var TestData = mongoose.model('TestData', testDataSchema);

module.exports = TestData;