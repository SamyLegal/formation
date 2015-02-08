var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schemaContact = new Schema({
  nom: String,
  prenom: String,
  address: String,
  phone: String
});

module.exports = mongoose.model('Contact', schemaContact);