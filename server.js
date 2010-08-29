// Quick fix for npm installs under Mac OS X
require.paths.push('/usr/local/lib/node')

// BSD licensed, rock along with it.

var sys = require('sys');
//var connect = require('connect');
var express = require('express');
//  var io = require('socket.io');
var ws = require('./ws');
var app = express.createServer();
var socket = ws.createServer();

// Config

// App

app.configure( function(){
  app.use(express.staticProvider(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/master', function(req, res){
  res.render('master.ejs');
});

app.get('/slave', function(req, res){
  res.render('slave.ejs');
});

// Socket

socket.addListener("connection", function(conn){
  sys.puts("Opening: " + conn.id);
  conn.addListener("message", function(message){
    if(!message.match(/png/)){};
    conn.broadcast(message);
  });
});

socket.addListener("close", function(conn){
  sys.puts("Closing: " + conn.id);
});

socket.listen(8080);
app.listen(80);
