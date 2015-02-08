var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var _ = require('underscore');

module.exports = function (contacts) {
  var app = express();
  app.use(serveStatic('./public'));
  app.use(bodyParser.json());
  router(app, contacts);
  app.listen(8080);
};

function router(app, contacts) {
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
}