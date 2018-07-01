var mongoose = require('mongoose');
var schema = mongoose.Schema;
var sessionSchema = new schema({
    sessionID:{type: String, unique: true, required: true},
    sessionDate:{type: Date, required: true},
    sessionDuration: {type: Number, required: true},
    testerID: {type: String, required: true},
    analystID: {type: String},
    testCaseID: {type: String, required: true},
    notebookID:{type: String},
    checked:{type: Boolean, required: true},
    testDataObject:{
    	screenCaptureURL: String,
	    subjectVideoURL: String,
	    subjectAudioURL: String,
	    subjectPulseURL: String
    },
    collectionMeasurIDList:[String],
    chosenInstractionIDList:[String]
}, {collection: 'sessions'});

//validation with DB
var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;