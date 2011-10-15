
var express = require('express');
var app = express.createServer();

app.set('view engine', 'jade');
app.use(app.router);
app.use(express.static(__dirname));

var Boards = {}

function Board() {
   this.code = "";
   this.observers = [];
}

Board.prototype = {
   addObserver: function (fn) {
      this.observers.push(fn);
      fn(this.code);
   },
   notifyObservers: function (code) {
      this.code = code;
      for (var i in this.observers) {
         this.observers[i](code);
      }
   },
}

app.get('/:name', function (req, res) {
   var name = req.params.name;
   if (name in Boards) {
      res.send('Sorry, "' + name + '" is taken!');
   } else {
      Boards[name] = new Board();
      res.render('teacher', { name: name });
   }
});

app.get('/:name/view', function (req, res) {
   res.render('student', { name: req.params.name });
});

app.get('/:name/del', function (req, res) {
   delete Boards[req.params.name];
   res.send('ok');
});

app.listen(8080);
console.log("http://localhost:8080");

var dnode = require('dnode');

var server = dnode(function (client, connection) {
   this.onBoardChanged = function (name, _callback) {
      if (name in Boards) {
         Boards[name].addObserver(_callback);
      }
   },
   this.changeBoard = function (name, code) {
      if (name in Boards) {
         Boards[name].notifyObservers(code);
      }
   }
});

server.listen(app);