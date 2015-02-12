/*
 * Est-ce que les promesses sont toujours résolues de manière asynchrone ?
 * 
 * La spécification Promises/A+ indique que les promesses doivent OBLIGATOIREMENT déclenchées leurs fonctions de résolution ou de rejet 
 * pendant le tour de boucle (Event Loop) qui a crée ces promesses.
 * 
 * Ceci est très important car cela élimine la possibilité d'ordre d'exécution aléatoire et aboutissant à des résultats indéterminés.
 * 
 * Vous pouvez vous attendre à ce que les fonctions passés à la méthode "then" d'une promesse seront appelé le prochain tour de la boucle d'événements.
 */

var q = require('q');

var def = q.defer();
def.promise.then(console.log, console.log);
def.resolve("SECOND");
console.log("FIRST");