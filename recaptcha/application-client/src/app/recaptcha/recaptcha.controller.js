'use strict';

angular.module('application').controller('RecaptchaCtrl', function($scope, $http) {
	$scope.recaptcha = 'Recaptcha';

	// Initialisation de l'objet contact
	$scope.contact = {};

	$scope.onSuccess = function(response) {
		$scope.contact.captcha = response;
	};

	$scope.demandeContact = function() {
		var url = 'https://www.google.com/recaptcha/api/';
		$http.get(url + 'siteverify?secret=6LcZOAATAAAAAIn7zfSycam9iWwohCehVe5tkvkA&response=' + $scope.contact.captcha + '&remoteip=127.0.0.1').then(
			function(response) {
				console.log('Response :' + response);
			},
			function(error) {
				console.log('Error :' + error);
			});
	};
});