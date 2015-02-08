module.exports = function (id, nom, prenom, address, phone) {
  this.id = id;
  this.nom = nom;
  this.prenom = prenom;
  this.address = address;
  this.phone = phone;

  this.toString = function () {
    var colours = true;
    if (colours) {
      return this.id + ' ' + this.nom.toUpperCase().blue + ' ' + this.prenom.red;
    } else {
      return this.id + ' ' + this.nom.toUpperCase() + ' ' + this.prenom;
    }
  }
}