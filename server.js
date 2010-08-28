// BSD licensed, rock along with it.

var sys = require('sys');
//var connect = require('connect');
var express = require('express');
var app = express.createServer();

// Config

app.configure( function(){
  app.use(express.staticProvider(__dirname + '/public'));
    });

app.get('/', function(req, res){
    res.render('index.ejs');
    });

app.listen(80);
