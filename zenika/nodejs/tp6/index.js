var router = require('./router');
var Contacts = require('./lib/contacts');

// Initialisation de la gestion des contacts
router(new Contacts({readMode: 'original'}));