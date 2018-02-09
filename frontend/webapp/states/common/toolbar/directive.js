angular.module("ttt").directive("tttToolbar", function (AuthService) {
    return {
        templateUrl: "states/common/toolbar/template.html",

        link: function ($scope) {
            $scope.isAuthenticated = function () {
                return AuthService.isAuthenticated();
            };
        }
    };
});