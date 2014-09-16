angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'partials/transcribe.html',
			controller: 'transcriptionController'
		})
        .otherwise({redirectTo: "/"})

	$locationProvider.html5Mode(true);

}]);