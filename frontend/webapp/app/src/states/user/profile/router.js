angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user.profile", {
            url:   "/profile",
            views: {
                "main@": {
                    template:   "<yasla-user-profile></yasla-user-profile>",
                    controller: function ($scope, UserService, ToolbarService) {
                        console.log("shopping.user.profile::router");
                        ToolbarService.title.set("Profile");
                        UserService.profile().then(function (data) {
                            $scope.user = data;
                        });
                    }
                }
            }
        });
});