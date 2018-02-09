angular.module("yasla").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.logout", {
            url:   "^/auth/logout",
            views: {
                "main@": {
                    template:   "<yasla-auth-logout></yasla-auth-logout>",
                    controller: function ($scope) {
                    }
                }
            }
        });
});