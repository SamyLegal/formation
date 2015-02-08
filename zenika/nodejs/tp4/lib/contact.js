module.exports = function (id, nom, prenom) {
  this.id = id;
  this.nom = nom;
  this.prenom = prenom;

  this.toString = function () {
    var colours = true;
    if (colours) {
      return this.id + ' ' + this.nom.toUpperCase().blue + ' ' + this.prenom.red;
    } else {
      return this.id + ' ' + this.nom.toUpperCase() + ' ' + this.prenom;
    }
  }
}