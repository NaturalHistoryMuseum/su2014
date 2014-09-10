angular.module('SpecimenController', []).controller('SpecimenController', function($scope, $http, $location) {

    $scope.formData = {};

    $scope.transcriptionData = []

    // TODO: Move this to a variable, that can auto populate the model
    var fields = {
        scientificName: {
            label: 'Scientific name',
            help: 'The scientific name is a latin name'
        },
        location: {
            label: 'Location',
            help: 'Where was this specimen found?'
        },
        typeStatus: {
            label: 'Type status',
            help: 'Something about type status'
        }
    }

    // Default field is the first in list of fields


//            // Get the latest transcription field that has not been populated
//            latestTranscription = data.transcriptions.slice(-1)[0];
//            for (var transcriptionField in formInfo) {
//                if(typeof(latestTranscription) === 'undefined' || typeof(latestTranscription[transcriptionField]) === 'undefined'){
//                    break;
//                }
//            }
//
//            $scope.field = transcriptionField


	// when landing on the page, get the specimen image and data
	$http.get('/api/specimen')
        .success(function(data) {
            $scope.specimen = data;
            $scope.field = Object.keys(fields)[0];

            $scope.label = fields[$scope.field]['label'];
            $scope.help = fields[$scope.field]['help'];
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	// On submission, send to specimen API
	$scope.saveTranscription = function() {

//        $scope.specimen = data;

        console.log($scope.formData);

        $scope.field = 'location'
        $scope.label = fields[$scope.field]['label'];
        $scope.help = fields[$scope.field]['help'];

//        console.log($scope)



//		$http.post('/api/specimen', $scope.formData)
//			.success(function(data) {
////				$scope.formData = {}; // clear the form so our user is ready to enter another
////				$scope.specimen = data;
////				console.log(data);
//                $location.path('/thanks');
//			})
//			.error(function(data) {
//				console.log('Error: ' + data);
//			});
	};



//	// On submission, send to specimen API
//	$scope.skip = function() {
//		$http.post('/api/specimen', {skip: true})
//			.success(function(data) {
//				$scope.formData = {}; // clear the form so our user is ready to enter another
//				$scope.specimen = data;
//				console.log(data);
//			})
//			.error(function(data) {
//				console.log('Error: ' + data);
//			});
//	};

});
