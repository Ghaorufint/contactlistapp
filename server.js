// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('education', ['education']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/education', function (req, res) {
  console.log('I received a GET request');

  db.education.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/education', function (req, res) {
  console.log(req.body);
  db.education.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/education/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.education.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/education/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.education.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/education/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.education.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8080);
console.log("Server running on port 8080");
