angular.module('transcriptionController', []).controller('transcriptionController', function($scope, $http, $route, $modal) {

    // Form placeholder
    $scope.formData = {};

    // when landing on the page, get the specimen image and data
	$http.get('/api/specimen')
        .success(function(data) {
            $scope.specimen = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.reload = function(){
        $route.reload();
    }

    $scope.saveTranscription = function(){

//        // Set the specimen ID
//        $scope.formData['_id'] = $scope.specimen['_id']
//
//        // And post the data back to the node API
//		$http.post('/api/specimen', $scope.formData)
//			.success(function(data) {
//                console.log('Success: record saved');
//			})
//			.error(function(data) {
//                // We'll just log the error - on the night we do not want to reveal any errors
//				console.log('Error: ' + data);
//			});

        // TODO: Pass in id/url
        // TODO: Get twitter working first before moving to modal

        $modal.open({
          templateUrl: '/partials/twitter.html',
          controller: 'twitterController'
        });

//        $location.path('/thank-you/' + $scope.specimen['_id']);

    }

});