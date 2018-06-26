'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var cors = require('cors');
var app = express();//create app obj - http server
var port = process.env.PORT || 3000;


//app.use('/images',express.static('/public/images'));
app.use(cors());
app.use(bodyParser.json());//enable to return jsons
app.use(bodyParser.urlencoded({extended:false}));
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




/* ====== MODULS ======
   ==================== */

var collectionMeasureAction = require('./mdls/collectionMeasure.js');

/* ====== ROUTES ======
   ==================== */

app.post('/collectionMeasure', collectionMeasureAction.findCollectionMeasureByID);

app.get('/try', function (req, res) { 
    res.send("this is try"); 
});

//--

app.get('/', function (req, res) { 
    res.status(200).json({message:"NWT_ws App is running!"}); 
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