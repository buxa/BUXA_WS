var mongoose = require('mongoose');
var schema = mongoose.Schema;
var notebookSchema = new schema({
    notebookID:{type: String, unique: true, required: true},
    sessionID:{type: String, required: true},
    lastEditing:{type: Date, required: true},
    conclusion: {type: String, required: true},
    remarkIDList: [String]
}, {collection: 'notebooks'});

//validation with DB
var Notebook = mongoose.model('Notebook', notebookSchema);

module.exports = Notebook;