angular.module('SpecimenController', []).controller('SpecimenController', function($scope, $http, $location) {

    $scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/specimen')
        .success(function(data) {
            $scope.specimen = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	// On submission, send to specimen API
	$scope.saveTranscription = function() {
		$http.post('/api/specimen', $scope.formData)
			.success(function(data) {
//				$scope.formData = {}; // clear the form so our user is ready to enter another
//				$scope.specimen = data;
//				console.log(data);
                $location.path('/thanks');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// On submission, send to specimen API
	$scope.skip = function() {
		$http.post('/api/specimen', {skip: true})
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.specimen = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

});
