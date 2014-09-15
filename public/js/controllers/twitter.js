angular.module('twitterController', []).controller('twitterController', function($scope, $http, $modalInstance) {

    // Form placeholder
    $scope.formData = {};

    $scope.send = function() {

        // TODO: Validate the username?

        // And post the data back to the node API
		$http.post('/tweet', $scope.formData)
			.success(function(data) {
                console.log('Success: tweet sent');
			})
			.error(function(data) {
                // We'll just log the error - on the night we do not want to reveal any errors
				console.log('Error: ' + data);
			});

    }

  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };

});