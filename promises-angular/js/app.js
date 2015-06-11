angular.module("moviesApp", []).config(["$parseProvider", function($parseProvider) {

  // Angular 1.2 - Configuration of $parseProvider for authorize resolving promises in the view.
  // This behaviour is deprecated in 1.2 and is not possible in 1.3.
  if (angular.version.minor === 2) {
    $parseProvider.unwrapPromises(true);
    $parseProvider.logPromiseWarnings(true);
  }
}]);

angular.module("moviesApp").controller("searchMoviesController", ["$scope", "$http", "$q", function($scope, $http, $q) {

  // Base url of service - Documentation de l'API http://docs.themoviedb.apiary.io/
  var baseUrl = "https://api.themoviedb.org/3/";

  // Base params for each request on service
  var baseParams = {
    api_key: "cd74aa6c7f7d824cd91d3477d87ae785",
    language: "fr"
  };

  $scope.query = "Retour vers le futur";

  function getMovie(idMovie) {
    return $http({
        method: "GET",
        url: baseUrl + "movie/" + idMovie,
        params: angular.extend({}, baseParams)
      })
      .then(function(response) {
        return response.data;
      })
      .then(function(movie){
        cleanGenres(movie);
        return movie;
      });
  }

  function cleanGenres(movie) {
    var genres = [];
    movie.genres.forEach(function(genre){
      genres.push(genre.name);
    });

    movie.genres = genres.toString();
  }

  function getInformationsOnMovies(movies) {

    // Dynamic promises
    var moviesPromises = [];
    movies.forEach(function(movie) {
      moviesPromises.push(getMovie(movie.id));
    });

    return $q.all(moviesPromises)
      .then(function(movies) {
        return movies;
      });
  }

  $scope.searchMovies = function() {

    $http({
        method: "GET",
        url: baseUrl + "search/movie",
        params: angular.extend({}, baseParams, {
          query: $scope.query
        })
      })
      .then(function(response) {
        return getInformationsOnMovies(response.data.results);
      })
      .then(function(movies) {
        $scope.movies = movies;
      })
      .catch(function(e) {
        $scope.error = e;
      });
  };

}]);