angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.login", {
            unauthenticated: true,
            url:             "^/auth/login",
            views:           {
                "main@": {
                    template:   "<ttt-auth-login></ttt-auth-login>",
                    controller: function (ToolbarService, AuthService, $state) {

                        // ---- Check if the user is already authenticated
                        //
                        if (AuthService.isAuthenticated()) {
                            $state.go("shopping.home");
                        }
                        else {
                            ToolbarService.title.set("Login");
                        }
                    }
                }
            }
        });
});