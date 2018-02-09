angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.user.profile", {
            url:   "/profile",
            views: {
                "main@": {
                    template:   "<ttt-user-profile></ttt-user-profile>",
                    controller: function ($scope, UserService, ToolbarService) {
                        ToolbarService.title.set("Profile");
                        UserService.profile().then(function (data) {
                            $scope.user = data;
                        });
                    }
                }
            }
        });
});