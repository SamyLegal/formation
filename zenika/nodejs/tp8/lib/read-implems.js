var path = __dirname + '/../data/contacts.json';
var fs = require('fs');
var JSONStream = require('JSONStream');
var through2 = require('through2');
var Contact = require('./contact');

exports.original = function (callback) {
  fs.readFile(path, function (err, contacts) {
    if (err) console.log(err);
    callback(JSON.parse(contacts));
  });
}

exports.stream = function (callback) {
  var contacts = [];
  fs.createReadStream(path)
    .pipe(JSONStream.parse('*'))
    .pipe(through2.obj(function(contact, encoding, callback) {
      contacts.push(contact);
      callback();
    }))
    .on('finish', function () {
      callback(contacts)
    })
}