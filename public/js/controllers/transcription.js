angular.module('transcriptionController', []).controller('transcriptionController', function($scope, $http, $route, $modal, $cookies) {

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

    // Do not want the keyboard to keep sliding in and out, and I cannot set focus on hidden element
    // So set focus to dummy element
    $scope.keepFormFocus = function(){
        $('input#dummy-focus').focus();
    }

    $scope.typeStatuses = [
        { name: "Type"},
        { name: "Cotype"},
        { name: "Holotype"},
        { name: "Paratype"},
        { name: "Syntype"}
    ];

    $scope.saveTranscription = function(){

        var typeStatus = []

        angular.forEach( $scope.typeStatuses, function( value, key ) {
            if ( value.ticked === true ) {
                typeStatus.push(value.name);
            }
        });

        if (typeStatus.length){
            $scope.formData['typeStatus'] = typeStatus
        }

        // Set the specimen ID
        $scope.formData['specimen'] = $scope.specimen

        // And post the data back to the node API
		$http.post('/api/specimen', $scope.formData)
			.success(function(data) {
                console.log('Success: record saved');
			})
			.error(function(data) {
                // We'll just log the error - on the night we do not want to reveal any errors
				console.log('Error: ' + data);
			});

        $modal.open({
          templateUrl: '/partials/twitter.html',
          controller: 'twitterController',
            resolve: {
                specimen: function () {
                    return $scope.specimen;
                }
            }
        });

    }

});