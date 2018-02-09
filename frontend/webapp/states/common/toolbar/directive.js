angular.module("ttt").directive("tttToolbar", function (AuthService) {
    return {
        templateUrl: "states/common/toolbar/template.html",

        controller: function ($scope) {
            $scope.isAuthenticated = function () {
                return AuthService.isAuthenticated();
            };
            $scope.show_left = true;
            $scope.show_right = false;
        }
    };
});