angular.module("yasla").directive("sticky", function ($mdSticky) {
    return {
        restrict: "A",
        link:     function ($scope, $element) {
            $mdSticky($scope, $element);
        }
    };
});