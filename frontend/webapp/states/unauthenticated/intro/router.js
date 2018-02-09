angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.intro", {
            unauthenticated: true,
            url:             "^/auth/intro",
            views:           {
                "main@": {
                    template:   "<yasla-auth-intro></yasla-auth-intro>",
                    controller: function ($scope, ToolbarService, AuthService, $state) {

                        // ---- Ensure the API is talking to us
                        //
                        AuthService.ping().then(
                            function () {
                            },
                            function () {
                                $scope.data.error = 2;
                            }
                        );

                        // ---- Check if the user is already authenticated
                        //
                        if (AuthService.isAuthenticated()) {
                            $state.go("shopping.home");
                        }
                        else {
                            ToolbarService.title.set("YASLA");
                        }
                    }
                }
            }
        });
});