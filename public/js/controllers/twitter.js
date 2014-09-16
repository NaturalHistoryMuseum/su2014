angular.module('twitterController', []).controller('twitterController', function($scope, $http, $route, $modalInstance, specimen) {

    // Form placeholder
    $scope.formData = {};

    $scope.send = function() {

        // TODO: Validate the username?


        $scope.formData['flickrURL'] = specimen.flickrURL;

        // And post the data back to the node API
		$http.post('/tweet', $scope.formData)
			.success(function(data) {
                console.log('Success: tweet sent');
			})
			.error(function(data) {
                // We'll just log the error - on the night we do not want to reveal any errors
				console.log('Error: ' + data);
			});

        $modalInstance.close();

    }

    // Close button action
    $scope.close = function () {
        $modalInstance.close();
    };

    // When closed, reload the page
    $modalInstance.result.then($route.reload, $route.reload)


});