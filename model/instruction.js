var mongoose = require('mongoose');
var schema = mongoose.Schema;
var instructionSchema = new schema({
    instructionID:{type: String, unique: true, required: true},
    duration:{type: Number, required: true},
    description: {type: String, required: true},
    testCaseIDList: [String]
}, {collection: 'instructions'});

//validation with DB
var Instruction = mongoose.model('Instruction', instructionSchema);

module.exports = Instruction;