angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'partials/transcribe.html',
			controller: 'transcriptionController'
		})
        .when('/thank-you/:id', {
			templateUrl: 'partials/twitter.html',
			controller: 'twitterController'
		})
//        .otherwise({redirectTo: "/"})

	$locationProvider.html5Mode(true);

}]);