angular.module("ttt").directive("tttAuthLogout", function ($state, AuthService) {
    return {
        templateUrl: "states/auth/logout/template.html",
        controller:  function ($scope) {
            $scope.logout = function () {
                AuthService.logout();
                $state.go("shopping.auth.loggedout");
            };
        }
    };
});