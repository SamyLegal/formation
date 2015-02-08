'use strict';

angular.module('application', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'mgcrea.ngStrap', 'vcRecaptcha'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/recaptcha', {
        templateUrl: 'app/recaptcha/recaptcha.html',
        controller: 'RecaptchaCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });