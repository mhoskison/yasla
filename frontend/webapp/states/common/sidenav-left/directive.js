angular.module("ttt").directive("tttSidenavLeft", function (UserService) {
    return {
        templateUrl: "states/common/sidenav-left/template.html",
        controller: function($scope) {
            UserService.profile().then(function(user) {
                $scope.user = user;
            });

        }
    };
});