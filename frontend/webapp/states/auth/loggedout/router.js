angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.loggedout", {
            unauthenticated: true,
            url:             "^/auth/loggedout",
            views:           {
                "main@": {
                    template: "<ttt-auth-logged-out></ttt-auth-logged-out>"
                }
            }
        });
});