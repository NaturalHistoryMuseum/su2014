	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'ImageController'
		})

	$locationProvider.html5Mode(true);

}]);