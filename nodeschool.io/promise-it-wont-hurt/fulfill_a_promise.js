/*
* Une promesse représente un objet dont la valeur sera disponible dans le futur.
* Quand la valeur est disponible nous appelons les méthodes "resolve" associées à l'objet promesse dans les autres cas nous appelons les
* méthodes "reject" qui contient en paramètre un objet Error.
*/
var q = require('q');

var delay = function (ms, message) {
	var deferred = q.defer();
	setTimeout(deferred.resolve(message), ms);
	return deferred.promise;
};

delay(300, "RESOLVED!").then(console.log);

