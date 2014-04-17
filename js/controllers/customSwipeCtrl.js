/**
 * Created by AlexCD on 15.04.2014.
 */

/**
 * Method binding swiping methods to scope
 * @method customSwipeCtrl
 * @param $scope
 */
function customSwipeCtrl($scope) {
    "use strict";
    /*global window*/
    $scope.swipeLeft = function () {
        window.alert('swiped left');
    };

    $scope.swipeRight = function () {
        window.alert('swiped right');
    };
}