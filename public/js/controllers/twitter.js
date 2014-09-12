angular.module('twitterController', []).controller('twitterController', function($scope, $routeParams) {

    // Use the ID, rather than passing in URL. Otherwise Spammable
    var id = $routeParams.id;
    console.log(id);

    $scope.doClick = function() {
        alert("clicked updated, you were missing a smi column(;) while calling function ");
    }

//        $route.reload();

});