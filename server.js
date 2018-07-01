'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var cors = require('cors');
var app = express();//create app obj - http server
var port = process.env.PORT || 3000;


//app.use('/images',express.static('/public/images'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//Parses the text as JSON and exposes the resulting object on req.body.

app.set('port', port);

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "Application/json");
	next();
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
}); 



/* ======================== MODULS ========================
   ======================================================== */


var collectionMeasureAction = require('./mdls/collectionMeasure.js');
var userAction = require('./mdls/user.js');
var subjectAction = require('./mdls/subject.js');
var testCaseAction = require('./mdls/testCase.js');
var instructionAction = require('./mdls/instruction.js');
var remarkAction = require('./mdls/remark.js');
var notebookAction = require('./mdls/notebook.js');
var sessionAction = require('./mdls/session.js');


/* ======================== ROUTES ========================
   ======================================================== */

// (1): Collection Measure Routes:

app.post('/createCollectionMeasure', collectionMeasureAction.createCollectionMeasure);
app.post('/findCollectionMeasureByID', collectionMeasureAction.findCollectionMeasureByID);
app.post('/findCollectionMeasureByType', collectionMeasureAction.findCollectionMeasureByType);
app.post('/getAllCollectionMeasures', collectionMeasureAction.getAllCollectionMeasures);
app.post('/updateCollectionMeasure', collectionMeasureAction.updateCollectionMeasure);
app.post('/removeCollectionMeasure', collectionMeasureAction.removeCollectionMeasure);


// (2): User Routes:

app.post('/createUser', userAction.createUser);
app.post('/findUserByID', userAction.findUserByID);
app.post('/findUserByType', userAction.findUserByType);
app.post('/getAllUsers', userAction.getAllUsers);
app.post('/addRelatedSession', userAction.addRelatedSession);
app.post('/changeUserStatus', userAction.changeUserStatus);
app.post('/login', userAction.login);


// (3): Subject Routes:

app.post('/addSubject', subjectAction.addSubject);
app.post('/findSubjectByID', subjectAction.findSubjectByID);
app.post('/removeSubject', subjectAction.removeSubject);


// (4): Test Case Routes:

app.post('/createTestCase', testCaseAction.createTestCase);
app.post('/findTestCaseByID', testCaseAction.findTestCaseByID);
app.post('/findTestCaseByType', testCaseAction.findTestCaseByType);
app.post('/removeTestCase', testCaseAction.removeTestCase);
app.post('/listOfTestCaseType', testCaseAction.listOfTestCaseType);


// (5): Instruction Routes:

app.post('/createInstruction', instructionAction.createInstruction);
app.post('/findInstructionByID', instructionAction.findInstructionByID);
app.post('/findInstructionByTastCase', instructionAction.findInstructionByTastCase);
app.post('/addRelatedTestCase', instructionAction.addRelatedTestCase);


// (6): Remark Routes:

app.post('/createRemark', remarkAction.createRemark);
app.post('/findRemarkByID', remarkAction.findRemarkByID);
app.post('/findRemarkByNotebook', remarkAction.findRemarkByNotebook);
app.post('/findRemarkBySession', remarkAction.findRemarkBySession);
app.post('/updateRemarkInfo', remarkAction.updateRemarkInfo);
app.post('/updateRemarkNotebookID', remarkAction.updateRemarkNotebookID);


// (7): Notebook Routes:

app.post('/createNotebook', notebookAction.createNotebook);
app.post('/findNotebookByID', notebookAction.findNotebookByID);
app.post('/getNotebookConclusion', notebookAction.getNotebookConclusion);
app.post('/removeRemarkFromNotebook', notebookAction.removeRemarkFromNotebook);
app.post('/addConclusion', notebookAction.addConclusion);


// (8): Session Routes:

app.post('/createSession', sessionAction.createSession);

/* ======================================================== */

app.get('/', function (req, res) { 
    res.status(200).json({message:"BUXA_WS App is running!"}); 
});

app.listen(port);
console.log("service is listening on port: " + port);




































/*var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200);
	res.write("we build a server")
	res.end();
}).listen(8080);
console.log('listening on port 8080');
*/

/*app.get('/' , function(req,res){
    res.send("OK");
});
app.listen(port);
console.log('listening..... on port ' + port);

*/