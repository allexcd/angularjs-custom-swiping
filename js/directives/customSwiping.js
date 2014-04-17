/*Created by AlexCD on 11.04.2014*/

/**
 * Directive to add a custom swiping effect on element, a swiping effect that will work on windows mobile phones
 * @method customSwiping
 * @returns {{restrict: string, scope: {right: string, left: string}, link: link}}
 */
function customSwiping() {
    "use strict";
    return {
        restrict: 'E',
        scope: {
            right: '=',
            left: '='
        },
        link: function (scope, element) {
            var startCoord, endCoord, timer;

            /**
             * Retrieves pageX, pageY coordinates
             * @method getTouchCoordinates
             * @param event
             * @returns {{x: (Number|pageX|*), y: (Number|pageY|*)}}
             */
            function getTouchCoordinates(event) {
                var touch;
                if (event.type === 'mousedown' || event.type === 'mousemove') {
                    touch = event;
                } else {
                    if (event.touches) {
                        touch = event.touches[0];
                    } else {
                        touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                    }
                }
                return {x: touch.pageX, y: touch.pageY};
            }

            /**
             * A swipe can be done 360 degrees. In this directive case, a swipe is executed when the angle has no more than 10 degrees.
             * So, to find the angle, trigonometry is used (tangent / arctangent functions)
             * @method getTheta
             * @returns {number}
             */
            function getTheta() {
                var dy, dx, theta;
                dy = endCoord.y - startCoord.y; //opposite cathetus
                dx = endCoord.x - startCoord.x; //adjacent cathetus

                //the angle
                theta = Math.atan2(dy, dx);
                theta *= 180 / Math.PI;

                //return the angle
                return Math.abs(theta);
            }

            /**
             * Each swipe uses specified callback
             * @method makeSwipe
             */
            function makeSwipe() {
                if (startCoord && endCoord) {
                    if ((startCoord.x - endCoord.x) < -10) {
                        if (scope.right) {
                            if (getTheta() >= 0 && getTheta() <= 10) {
                                scope.right();
                                scope.$apply();

                            }
                        }
                    } else if ((startCoord.x - endCoord.x) > 10) {
                        if (scope.left) {
                            if (getTheta() >= 170 && getTheta() <= 180) {
                                scope.left();
                                scope.$apply();
                            }
                        }
                    }
                }
            }

            function getStartCoord(e) {
                return getTouchCoordinates(e);
            }

            function getEndCoord(e) {
                return getTouchCoordinates(e);
            }

            function detectMouseEnd() {
                /*global window, clearTimeout*/
                if (timer) {
                    clearTimeout(timer);
                }
                timer = window.setTimeout(function () {
                    element.off('mousemove');
                    clearTimeout(timer);
                    makeSwipe();
                }, 50);
            }

            (function () {
                //For IE and desktops
                //Mouse events are used instead of pointer events. IE pointer events incorporate both mouse events and touch events but they will be prone to
                //changes as IE does this all the time. For instance IE10 uses MSPointerDown, MSPointerMove, MSPointerUp but these are deprecated and not used in IE11. IE11
                //uses pointerdown, pointermove, pointerup. Of course, conditions can be used but the idea is to keep the code as simple as possible, ignoring IE bliss.
                //So mouse events can be used instead.
                //Since mouseup event can create problems, a mouseend method will be used to track the end of swiping
                element.on('mousedown', function (e) {
                    startCoord = getStartCoord(e);

                    element.on('mousemove', function (e) {
                        endCoord = getEndCoord(e);
                        detectMouseEnd(e);
                    });

                });

                //For all other mobile browsers
                element.on('touchstart', function (e) {
                    startCoord = getStartCoord(e);
                });
                element.on('touchend', function (e) {
                    endCoord = getEndCoord(e);
                    makeSwipe();
                });

            }());

            scope.$on('$destroy', function () {
                element.off();
            });

        }
    };
}