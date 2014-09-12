angular.module('appStates', []).config(function($stateProvider, $urlRouterProvider) {

    var states = [
        {
            name: 'transcribe.name',
            url: '/name',
            data: {
                label: 'Scientific name'
            }
        },
        {
            name: 'transcribe.location',
            url: '/location',
            data: {
                label: 'Location'
            }
        }
    ]

    steps = []

    // And add the main states
    angular.forEach(states, function (state) {
        $stateProvider.state(state.name, state);
        steps.push({
            'name': state.name,
            'label': state.data.label
        })
    });


    // Add default state
    $stateProvider.state('transcribe', {
        templateUrl: 'partials/transcribe.html',
        controller: 'transcriptionController',
        resolve: {
            formObj: 'hello'
        }
    })

	// catch all route
	// send users to the transcription page
	$urlRouterProvider.otherwise('/name');

});