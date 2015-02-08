var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var _ = require('underscore');
var socketio = require('socket.io');

module.exports = function (contacts) {
  var app = express();
  app.use(serveStatic('./public'));
  app.use(bodyParser.json());

  var server = app.listen(8080);
  var io = socketio.listen(server);

  router(app, io, contacts);
};

function router(app, io, contacts) {
  app.get('/rest/contacts', function (req, res) {
    contacts.get(function (contacts) {
      res.send(contacts);
    })
  });
  app.get('/rest/contacts/:id', function (req, res) {
    var id = req.params.id;
    contacts.get(id, function (contact) {
      res.send(contact);
    })
  });
  app.post('/rest/contacts', function (req, res) {
    var contact = req.body;
    contacts.add(contact.nom, contact.prenom, contact.address, contact.phone, function (contacts) {
      res.send(contacts);
    })
  });
  app.put('/rest/contacts/:id', function (req, res) {
    var contact = req.body;
    var id = req.params.id;
    contacts.put(id, contact, function (contacts) {
      res.send(contacts);
    })
  });
  app.delete('/rest/contacts/:id', function (req, res) {
    var id = req.params.id;
    contacts.delete(id, function (contacts) {
      res.send(contacts);
    })
  });

  io.sockets.on('connection', function (socket) {
    console.log('Connexion de la socket au serveur socket.io');
  });

  contacts.watch(function(contacts){
    io.sockets.emit('contacts', contacts);
  })
}