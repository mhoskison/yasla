angular.module("yasla").directive("infoMediaSize", function ($mdMedia) {
    return {
        templateUrl: "common/info-media-size/template.html",
        controller:  function ($scope) {
        },
        link:        function ($scope) {
            $scope.$watch(function () {
                return $mdMedia("lg");
            }, function (d) {
                $scope.lg = d;
            });

            $scope.$watch(function () {
                return $mdMedia("md");
            }, function (d) {
                $scope.md = d;
            });

            $scope.$watch(function () {
                return $mdMedia("sm");
            }, function (d) {
                $scope.sm = d;
            });

            $scope.$watch(function () {
                return $mdMedia("xs");
            }, function (d) {
                $scope.xs = d;
            });

            $scope.$watch(function () {
                return $mdMedia("xl");
            }, function (d) {
                $scope.xl = d;
            });
        }
    };
});