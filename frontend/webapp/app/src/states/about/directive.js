angular.module("yasla").directive("yaslaAbout", function (CordovaService) {
    return {
        templateUrl: "src/states/about/template.html",
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