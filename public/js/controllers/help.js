
angular.module('modalHelpController', []).controller('modalHelpController', function($scope, $modal) {

  // Need to initialise for wizard step to be populated
  $scope.step = true;

  $scope.showHelp = function (step) {

    var templateFileName = step.toLowerCase().replace(/ /g,"-");

    $modal.open({
      templateUrl: '/partials/help/' + templateFileName + '.html',
      controller: modalInstanceHelpController
    });

  };
});

var modalInstanceHelpController = function ($scope, $modalInstance) {
  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
};