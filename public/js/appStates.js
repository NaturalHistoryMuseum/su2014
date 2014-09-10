angular.module('appStates', []).config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('transcribe', {
			templateUrl: 'partials/transcribe.html',
            controller: 'transcriptionController'
		})

		// nested states
		.state('transcribe.name', {
			url: '/name',
			templateUrl: 'partials/transcribe.name.html'
		})

		.state('transcribe.location', {
			url: '/location',
			templateUrl: 'partials/transcribe.location.html'
		})

	// catch all route
	// send users to the transcription page
	$urlRouterProvider.otherwise('/name');

});