angular.module('transcriptionController', []).controller('transcriptionController', function($scope, $http) {

    // TODO: On refresh, home

    // when landing on the page, get the specimen image and data
	$http.get('/api/specimen')
        .success(function(data) {
            $scope.specimen = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

//    $scope.reload = function(){
//        $state.go($state.$current, null, { reload: true });
//    }
//
//    $scope.$on('$stateChangeStart', function(event, toState){
//        // TODO: This is called twice!
//        console.log("STATE");
//
//        $scope.data = toState.data;
////        event.preventDefault();
//    })


});