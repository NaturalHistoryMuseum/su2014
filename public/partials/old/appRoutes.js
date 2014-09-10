angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'SpecimenController'
		})
        .when('/thanks', {
			templateUrl: 'partials/thanks.html',
			controller: 'ThanksController'
		})

	$locationProvider.html5Mode(true);

}]);