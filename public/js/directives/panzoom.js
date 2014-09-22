angular.module('panzoom', []).directive('panzoom', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element) {

            $(element).panzoom({
                minScale: 1
            });

//            TODO: Zoom out

            console.log($(element).find('img').clientHeight)

            $(element).find('img').load(function() {

                var $img = $(element).find('img')
                $img.css('height', $(this).height() + 'px');
                $img.css('max-height', 'none');

            });

            $(element).find('img').addSwipeEvents().bind('doubletap', function(evt, touch) {
                $(element).panzoom("zoom", {
                     focal: touch.touch,
                     animate: true,
                     increment: 0.5
                });
            });

        }
    };
});