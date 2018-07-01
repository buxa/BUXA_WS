var mongoose = require('mongoose');
var schema = mongoose.Schema;
var remarkSchema = new schema({
    remarkID:{type: String, unique: true, required: true},
    sessionID:{type: String, required: true},
    notebookID: {type: String, required: true},
    time:{type: Date, required: true},
    info: {type: String, required: true}
}, {collection: 'remarks'});

//validation with DB
var Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;