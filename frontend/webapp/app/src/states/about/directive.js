angular.module("yasla").directive("yaslaAbout", function (CordovaService) {
    return {
        templateUrl: "states/about/template.html",
        controller:  function ($scope) {
            $scope.data = {
                version: null
            };

            CordovaService.version().then(function (version) {
                $scope.data.version = version;
            });
        }
    };
});