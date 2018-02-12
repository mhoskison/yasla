angular.module("yasla").directive("appToolbar", function ($mdSidenav, AuthService) {

    return {
        templateUrl: "src/common/app-toolbar/template.html",
        scope:       {},
        link:        function ($scope) {
            $scope.sidenav = {
                authenticated: AuthService.isAuthenticated(),
                openMenu:      function () {
                    $mdSidenav("left").open();
                }
            };
        },
        controller:  function ($scope) {
            $scope.isAuthenticated = function () {
                return AuthService.isAuthenticated();
            };
        }
    };
});