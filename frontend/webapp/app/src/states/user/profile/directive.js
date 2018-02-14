angular.module("yasla").directive("yaslaUserProfile", function (localStorageService) {
    return {
        templateUrl: "states/user/profile/template.html",
        controller:  function ($scope) {
            $scope.state = {
                user: localStorageService.get("user")
            };
        }
    };
});