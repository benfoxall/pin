var express = require("express");
var app = express();
var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
var pinGenerator = require('./generator.js')(redis);

app.use(express.logger());
app.use(express.bodyParser());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(request, response) {
  response.send('pin');
});

app.post('/', function(request,response){
	var peer_id = request.body.peer_id,
			pin = pinGenerator();

	console.log("storing: peers-" + pin.join('') + ' = ' + peer_id);

	redis.set('peers-' + pin.join(''), peer_id)

	response.send(pin)
});

app.post('/:id', function(request,response){
	console.log("----getting: " + 'peers-' + request.param('id'));
	redis.get('peers-' + request.param('id'), function(err, data){
		console.log("BACK.", arguments)
		response.send({peer_id:data})
	});
})

app.use(express.static('client'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});