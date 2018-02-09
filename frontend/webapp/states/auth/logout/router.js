angular.module("ttt").config(function ($stateProvider) {
    $stateProvider
        .state("shopping.auth.logout", {
            url:   "^/auth/logout",
            views: {
                "main@": {
                    template:   "<ttt-auth-logout></ttt-auth-logout>",
                    controller: function ($scope) {
                    }
                }
            }
        });
});