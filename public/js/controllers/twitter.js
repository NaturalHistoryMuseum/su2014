angular.module('twitterController', []).controller('twitterController', function($scope, $http, $route, $cookies, $modalInstance, specimen) {

    // Form placeholder
    $scope.formData = {};

    $scope.informaticiansAuthName = ('su2014-key' in $cookies);

    $scope.tweet = encodeURI('I have just transcribed @nhm_london specimen ' + specimen.flickrURL) + '%20%23SU2014';

    $scope.send = function() {

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