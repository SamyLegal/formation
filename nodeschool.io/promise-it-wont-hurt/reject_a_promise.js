var q = require('q');

var displayMessage = function(error){
	console.log(error.message);
};

var delay = function (ms, message) {
	var deferred = q.defer();
	setTimeout(deferred.reject(new Error(message)), ms);
	return deferred.promise;
};

delay(300, "REJECTED!").then(console.log, displayMessage);
