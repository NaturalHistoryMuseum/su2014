angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'partials/transcribe.html',
			controller: 'transcriptionController'
		})
        .when('/dev', {
			templateUrl: 'partials/twitter.html',
			controller: 'twitterController'
		})
        .otherwise({redirectTo: "/"})

	$locationProvider.html5Mode(true);

}]);