var mongoose = require('mongoose');
var schema = mongoose.Schema;
var subjectSchema = new schema({
    subjectID:{type: String, unique: true, required: true},
    gender: {type: String, required: true},
    age:{type: Number, required: true},
    sessionID: {type: String, required: true}
}, {collection: 'subjects'});

//validation with DB
var Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;