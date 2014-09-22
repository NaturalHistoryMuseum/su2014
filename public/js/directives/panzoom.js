angular.module('panzoom', []).directive('panzoom', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element) {

            var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            var is_android = navigator.platform.toLowerCase().indexOf("android") > -1;

            $(element).panzoom({
                minScale: 1
            });

            var $img = $(element).find('img');

            $img.addSwipeEvents().bind('doubletap', function(evt, touch) {
                $(element).panzoom("zoom", {
                     focal: touch.touch,
                     animate: true,
                     increment: 0.5
                });
            });

            // Horrible hack: Firefox on Android resets window size when you start typing - so fix image size onload()
            if(is_firefox && is_android){
                $img.load(function() {
                    var $img = $(element).find('img')
                    $img.css('height', $(this).height() + 'px');
                    $img.css('max-height', 'none');
                });

            }

        }
    };
});