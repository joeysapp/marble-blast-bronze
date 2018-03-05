var express = require('express');
var app = express();

// Web sockets!
var server = require('http').Server(app);  
var io = require('socket.io')(server);

// Fluff
var path = require('path');
var useragent = require('useragent');
// Connect to latest useragent library
// useragent(true);


server.listen(process.env.PORT || 8000, "0.0.0.0", function(){
	console.log("Server running: ", server.address());
	console.log("App running: ", app);

});
app.use(express.static('public'));

io.on('connection', function(socket){
	socket.on('mouse_was_clicked', function(data){
		console.log("server-side mouse_was_clicked received");

		// THIS DOES NOT GO BACK TO SENDER.
		// socket.broadcast.emit('placeDot', data);

		// THIS DOES.
		io.sockets.emit('mouse_was_clicked', data);
	});
});

// This is how we provide all the needed files under this directory
// as in they are "static" and never change
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
	var agent = useragent.parse(req.headers['user-agent']);

	// Do this once there are lots of people connecting, speedups
	// var agent = useragent.lookup(req.headers['user-agent']);
	console.log(req.headers);
});
