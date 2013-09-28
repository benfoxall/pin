var express = require("express");
var app = express();
var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
var pinGenerator = require('./generator.js')();

app.use(express.logger());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(request, response) {
  response.send('pin');
});

app.post('/', function(request,response){
	response.send(pinGenerator())
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});