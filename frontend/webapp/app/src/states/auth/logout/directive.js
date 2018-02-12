angular.module("yasla").directive("yaslaAuthLogout", function ($state, AuthService) {
    return {
        templateUrl: "src/states/auth/logout/template.html",
        controller:  function ($scope) {
            $scope.logout = function () {
                AuthService.logout();
                $state.go("shopping.auth.loggedout");
            };
        }
    };
});