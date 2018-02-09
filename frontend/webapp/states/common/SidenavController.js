angular.module("ttt").controller("SidenavCtrl", function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildToggler("left");
    $scope.toggleRight = buildToggler("right");
    $scope.isOpenRight = function () {
        return $mdSidenav("right").isOpen();
    };

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }
})
    .controller("LeftCtrl", function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav("left").close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
    })
    .controller("RightCtrl", function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav("right").close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });
