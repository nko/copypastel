// Quick fix for npm installs under Mac OS X
require.paths.push('/usr/local/lib/node')

// BSD licensed, rock along with it.

var sys = require('sys');
//var connect = require('connect');
var express = require('express');
var io = require('socket.io');
var app = express.createServer();

// Config

app.configure( function(){
  app.use(express.staticProvider(__dirname + '/public'));
    });

app.get('/', function(req, res){
    res.render('index.ejs');
    });

var socket = io.listen(app);

socket.on('connection', function(client){
	// client.send({ buffer: buffer });
	// We need to create a channel between 
	// Since we're only having two clients connecting right now, broadcasting should be fine.
	// Prolly gonna want to send a message on loadRom to do the same on another client
	// client.broadcast({ announcement: client.sessionId + ' connected' }, [client_ids]);

	client.on('message', function(message){
		var msg = { message: [client.sessionId, message] };
		//buffer.push(msg);
		//if (buffer.length > 15) buffer.shift();
		client.broadcast(msg);
    sys.puts(message);
	});

	client.on('disconnect', function(){
		//client.broadcast({ announcement: client.sessionId + ' disconnected' });
		sys.puts( "Disconnected: " + client.sessionId );
	});
});

app.listen(80);
