var _ = require('underscore');
var package = require('./package.json');
var program = require('commander');
require('colours');

module.exports = function (contactsToDisplay) {
  program
    .command('add <nom> <prenom>')
    .action(function (nom, prenom) {
      if (nom && prenom) {
        contactsToDisplay.add(nom, prenom, function (data) {
          contactsToDisplay.print();
        });
      }
    });

  program
    .command('delete <id>')
    .action(function (id) {
      if (id) {
        contactsToDisplay.delete(id, function (data) {
          contactsToDisplay.print();
        });
      }
    });

  program
    .command('watch')
    .action(function () {
      contactsToDisplay.watch();
    });

  program
    .version(package.version)
    .option('-p, --print', 'Print contacts')
    .option('-c, --colours', 'Colour contacts');

  program.parse(process.argv);

  console.log('Gestion des contacts');
  if (program.print) {
    contactsToDisplay.print();
  }
}

