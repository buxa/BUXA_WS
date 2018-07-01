var mongoose = require('mongoose');
var schema = mongoose.Schema;
var testCaseSchema = new schema({
    caseID:{type: String, unique: true, required: true},
    type: {type: String, required: true},
    name:{type: String, required: true},
    description: {type: String, required: true},
    optionalInstructionIDList:[String]
}, {collection: 'testCases'});

//validation with DB
var TestCase = mongoose.model('TestCase', testCaseSchema);

module.exports = TestCase;