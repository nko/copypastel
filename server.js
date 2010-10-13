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
var MASTER = 0;
var SLAVE = 1;

// Monkey patching

Array.prototype.remove = function(element){
  var index = this.indexOf(element);
  if(index >= 0){ 
    var element = this[index];
    this.splice(index, index);
    return element;
  }else{
    return null;
  }
}

// App

app.configure( function(){
  app.use(express.staticProvider(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('index.ejs');
});

// Allow /conn.id for someone to connect with said player.
// Random players is v.2

app.get('/:id', function(req, res){
  res.render('slave.ejs');
});

app.get('/master', function(req, res){
  res.render('master.ejs');
});

app.get('/slave', function(req, res){
  res.render('slave.ejs');
});

var channels = {};
var queue = [];

socket.addListener("connection", function(conn){
  sys.puts("Opening: " + conn.id);
  queue.push(conn.id);
  conn.addListener("message", function(message){
    // Output everything running through sockets; uncomment with care
    //sys.puts(message + " from " + conn.id);
    // If we're paired, just pass along the message
    if(channels[conn.id]){ socket.send(channels[conn.id], message); } 
    else{ // Else, it must be looking to pair up
      var partner = parseInt(message);
      // Make sure the partner exists.
      // Also make sure partner is available.
      // A partner 0 means client wants to know his own id
      if( partner == 0 ){ conn.send(JSON.stringify({id: conn.id})) }
      else if( queue.remove(partner) ){
        sys.puts("Pairing up " + partner + " with " + conn.id + ".");
        channels[partner] = conn.id;
        channels[conn.id] = partner;
        queue.remove(conn.id);
      }else { // Partner isn't available.
        //conn.send(JSON.stringify({error: "Partner isn't available."}));
      }
    }
  });
  /*
  conn.addListener("message", function(message){
    if(message[0] == "m"){
      // Master
      sys.puts("Master " + conn.id + " connected.")
      if(slavesWaiting.length == 0){
        mastersWaiting.push(conn.id);
      }else{
        // Have a pair.
        var master = {id: conn.id, type: MASTER};
        var slave = {id: slavesWaiting.shift(), type: SLAVE};
        sys.puts("Matching slave " + slave.id + " with master " + master.id);
        channels[master.id] = slave;
        channels[slave.id] = master;
      };
    }
    else if(message[0] == "s"){
      // Slave
      sys.puts("Slave " + conn.id + " connected.")
      if(mastersWaiting.length == 0){
        slavesWaiting.push(conn.id);
      }else{
        // Have a pair.
        var master = {id: mastersWaiting.shift(), type: MASTER};
        var slave = {id: conn.id, type: SLAVE};
        sys.puts("Matching slave " + slave.id + " with master " + master.id);
        channels[master.id] = slave;
        channels[slave.id] = master;
      }
    }else{
      // Try to send message
      if(channels[conn.id]){
        var partner = channels[conn.id];
        sys.puts("Sending " + message + "  " + conn.id + " to " + partner.id);
        socket.send(partner.id, message);
      }
    }
  });*/
});

socket.addListener("close", function(conn){
  sys.puts("Closing: " + conn.id);
  if(channels[conn.id]){
    var partner = channels[conn.id];
    socket.send(partner, JSON.stringify({close: conn.id}));
    channels[conn.id] = undefined;
    channels[partner.id] = undefined;
    // need to put partner in waiting list.
    queue.push(partner.id);
  }else{
    // was in a waiting list
    queue.remove(conn.id);
  }
});

socket.listen(8080);
app.listen(80);
