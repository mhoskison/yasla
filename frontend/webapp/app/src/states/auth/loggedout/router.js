angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.loggedout", {
            unauthenticated: true,
            url:             "^/auth/loggedout",
            views:           {
                "main@": {
                    template: "<yasla-auth-logged-out></yasla-auth-logged-out>"
                }
            }
        });
});