angular.module('compileTwitter', []).config(['$compileProvider', function($compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|twitter|chrome-extension):/);

}]);