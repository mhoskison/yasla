angular.module("yasla").directive("appMainMenu", function ($mdSidenav, APP_VERSION, $state, localStorageService) {
    return {
        templateUrl: "common/app-main-menu/template.html",
        controller:  function ($scope) {
            $scope.state = {
                mode:    0,
                version: APP_VERSION,
                user:    localStorageService.get("user")
            };
            $scope.sidenav = {

                goto: function (state) {
                    $scope.sidenav.closeMenu();
                    $state.go(state);
                },

                closeMenu:  function () {
                    $mdSidenav("left").close();
                },
                switchMode: function () {

                    if ($scope.state.mode === 0) {
                        $scope.state.mode = 1;
                        $(".state-btn").addClass("rotated");
                    }
                    else {
                        $scope.state.mode = 0;
                        $(".state-btn").removeClass("rotated");
                    }
                }
            };
        },
        link:        function ($scope) {

        }
    };
});